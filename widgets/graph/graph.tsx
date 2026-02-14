"use client"
import {applyNodeChanges, ReactFlow, useReactFlow, applyEdgeChanges, addEdge, ReactFlowProvider, MarkerType} from "@xyflow/react";
import type {
    Edge,
    Node,
    OnConnect,
    OnEdgesChange,
    OnNodesChange
} from "@xyflow/react";
import type {ElkExtendedEdge, ElkNode, LayoutOptions} from 'elkjs';
import {Term} from "@/shared/model/term";
import {useCallback, useEffect, useLayoutEffect, useState} from "react";
import {Relation} from "@/shared/model/relation";
import {getApi} from "@/shared/api";

import ELK from 'elkjs/lib/elk.bundled.js';
import '@xyflow/react/dist/style.css'

const transformTermToNode = (term: Term): Node => {
    return {
        id: term.keyword,
        position: {x: 0, y: 0},
        data: {
            label: term.keyword
        }
    }
}

const transformRelationToEdge = (relation: Relation): Edge => {
    return {
        id: `${relation.source_keyword}->${relation.target_keyword}`,
        source: relation.source_keyword,
        target: relation.target_keyword,
        label: relation.relation_type,
        markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
        },
    }
}

const elk = new ELK();

const elkOptions = {
    'elk.algorithm': 'layered',
    'elk.layered.spacing.nodeNodeBetweenLayers': '150',
    'elk.layered.spacing.edgeNodeBetweenLayers': '30',
    'spacing.componentComponent': '20',
    'elk.spacing.nodeNode': '140',
    'elk.edgeRouting': 'POLYLINE'
};

const getLayoutedElements = async (nodes: Node[], edges: ElkExtendedEdge[], options: LayoutOptions = {}) => {
    const isHorizontal = options?.['elk.direction'] === 'RIGHT';
    const graph: ElkNode = {
        id: 'root',
        layoutOptions: options,
        children: nodes.map((node) => ({
            ...node,
            targetPosition: isHorizontal ? 'left' : 'top',
            sourcePosition: isHorizontal ? 'right' : 'bottom',

            width: 150,
            height: 50,
        })),
        edges: edges,
    };

    try {
        const layoutedGraph = await elk
            .layout(graph);
        return ({
            nodes: layoutedGraph.children!.map((node_1) => ({
                ...node_1,
                position: {x: node_1.x, y: node_1.y},
            })),

            edges: layoutedGraph.edges,
        });
    } catch (message) {
        return console.error(message);
    }
};

const LayoutFlow = () => {
    const [terms, setTerms] = useState<Term[]>([]);
    const [relations, setRelations] = useState<Relation[]>([]);

    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const {fitView} = useReactFlow();

    useEffect(() => {
        getApi.getTerms().then(terms => setTerms(terms));
        getApi.getRelations().then(relations => setRelations(relations));
    }, [setTerms, setRelations]);

    const onLayout = useCallback(({direction = 'DOWN'}) => {
        const opts = {'elk.direction': direction, ...elkOptions};
        const ns = terms.map(term => transformTermToNode(term));
        const es: ElkExtendedEdge[] = relations.map(rel => transformRelationToEdge(rel)).map(edge => ({
            ...edge,
            sources: [edge.source],
            targets: [edge.target]
        }));

        getLayoutedElements(ns, es, opts).then(
            (res: any) => {
                setNodes(res.nodes);
                setEdges(res.edges);
                fitView();
            },
        );

    }, [terms, relations, setNodes, setEdges, fitView]);

    useLayoutEffect(() => {
        onLayout({direction: 'LEFT'});
    }, [onLayout]);

    const onNodesChange: OnNodesChange = useCallback(
        (changes) => setNodes((nodesSnapshot) => {
            return applyNodeChanges(changes, nodesSnapshot || [])
        }),
        [],
    );
    const onEdgesChange: OnEdgesChange = useCallback(
        (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect: OnConnect = useCallback(
        (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
        />
    );
}

const Graph = () => {
    return (
        <ReactFlowProvider>
            <LayoutFlow />
        </ReactFlowProvider>
    )
}

export default Graph;