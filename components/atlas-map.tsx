"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ReactFlow,
  Handle,
  Position,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { domains } from "@/lib/content/domains";

/*
 * The Atlas as a conceptual map (Standard 09). Fixed radial layout —
 * Organizations at the center, six domains around it. Quiet at rest;
 * on hover a node lifts slightly and its edge to the center darkens.
 * All library interactivity (pan/zoom/drag/select) is disabled.
 */

type MapNodeData = { label: string; href?: string; center?: boolean };
type MapNode = Node<MapNodeData>;

const hiddenHandle = { opacity: 0, pointerEvents: "none" as const };

function CircleNode({ data }: NodeProps<MapNode>) {
  const base =
    "flex items-center justify-center rounded-full text-center transition-[transform,box-shadow,border-color,color] duration-200 motion-reduce:transition-none";
  return (
    <>
      <Handle type="target" position={Position.Top} style={hiddenHandle} />
      {data.center ? (
        <div
          className={`${base} h-40 w-40 bg-interaction`}
          aria-hidden="true"
        >
          <span className="font-serif text-base italic text-atmosphere">
            {data.label}
          </span>
        </div>
      ) : (
        <Link
          href={data.href ?? "/atlas"}
          className={`${base} h-28 w-28 border border-structure/40 bg-atmosphere p-3 text-information hover:-translate-y-1 hover:scale-105 hover:border-interaction hover:text-interaction hover:shadow-lg hover:shadow-structure/20 motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100`}
        >
          <span className="font-sans text-xs uppercase tracking-[0.15em] text-inherit">
            {data.label}
          </span>
        </Link>
      )}
      <Handle type="source" position={Position.Bottom} style={hiddenHandle} />
    </>
  );
}

const nodeTypes = { circle: CircleNode };

const RADIUS = 195;
const ANGLES = [-90, -30, 30, 90, 150, 210]; // Strategy at top, clockwise

const nodes: MapNode[] = [
  {
    id: "organizations",
    type: "circle",
    position: { x: 0, y: 0 },
    data: { label: "Organizations", center: true },
    draggable: false,
    selectable: false,
    focusable: false,
  },
  ...domains.map((d, i) => {
    const a = (ANGLES[i] * Math.PI) / 180;
    return {
      id: d.slug,
      type: "circle",
      position: { x: RADIUS * Math.cos(a), y: RADIUS * Math.sin(a) },
      data: { label: d.name, href: `/atlas/${d.slug}` },
      draggable: false,
      selectable: false,
      focusable: false,
    } satisfies MapNode;
  }),
];

export function AtlasMap({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = useState<string | null>(null);

  const edges: Edge[] = useMemo(
    () =>
      domains.map((d) => ({
        id: `e-${d.slug}`,
        source: "organizations",
        target: d.slug,
        type: "straight",
        focusable: false,
        style:
          hovered === d.slug
            ? { stroke: "var(--interaction)", strokeOpacity: 0.8, strokeWidth: 1.5 }
            : { stroke: "var(--structure)", strokeOpacity: 0.3, strokeWidth: 1 },
      })),
    [hovered],
  );

  return (
    <div className={`atlas-map aspect-square w-full ${className}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        nodeOrigin={[0.5, 0.5]}
        fitView
        fitViewOptions={{ padding: 0.05 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        panOnScroll={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
        onNodeMouseEnter={(_, node) => setHovered(node.id)}
        onNodeMouseLeave={() => setHovered(null)}
        style={{ background: "transparent" }}
      />
    </div>
  );
}
