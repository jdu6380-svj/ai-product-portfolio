"use client";

import { useEffect, useRef, useState } from "react";
import { ProductPreview } from "@/components/product-preview";

const products = [
  { id: "growthos", label: "GrowthOS", description: "把内容工作变成可推进的流程" },
  { id: "novera", label: "Novera AI", description: "让每个回答都能回到可信来源" },
  { id: "evidra", label: "Evidra", description: "让论据与来源经得起检查" },
] as const;

type ProductId = (typeof products)[number]["id"];

export function HeroWorkbench() {
  const [activeId, setActiveId] = useState<ProductId>("growthos");
  const workbenchRef = useRef<HTMLDivElement>(null);
  const activeProduct = products.find((product) => product.id === activeId)!;

  useEffect(() => {
    const node = workbenchRef.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    let pointer: PointerEvent | null = null;
    const handlePointerMove = (event: PointerEvent) => {
      pointer = event;
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        if (!pointer) return;
        const bounds = node.getBoundingClientRect();
        if (!bounds.width || !bounds.height) return;
        const x = ((pointer.clientX - bounds.left) / bounds.width - 0.5) * 2;
        const y = ((pointer.clientY - bounds.top) / bounds.height - 0.5) * 2;
        node.style.setProperty("--pointer-x", `${(x * 5).toFixed(2)}px`);
        node.style.setProperty("--pointer-y", `${(y * 5).toFixed(2)}px`);
        pointer = null;
      });
    };
    const resetPointer = () => {
      pointer = null;
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      node.style.setProperty("--pointer-x", "0px");
      node.style.setProperty("--pointer-y", "0px");
    };
    node.addEventListener("pointermove", handlePointerMove);
    node.addEventListener("pointerleave", resetPointer);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      node.removeEventListener("pointermove", handlePointerMove);
      node.removeEventListener("pointerleave", resetPointer);
    };
  }, []);

  return (
    <div ref={workbenchRef} className="hero-workbench" aria-label="精选产品原型">
      <div className="workbench-heading">
        <div>
          <span className="workbench-overline">产品现场 / 01</span>
          <p>{activeProduct.description}</p>
        </div>
        <span className="workbench-live"><i /> 交互原型</span>
      </div>
      <div className="workbench-annotation" aria-hidden="true"><span>产品预览</span><i /><span>01 / 03</span></div>
      <div className="workbench-preview" key={activeId}>
        <ProductPreview variant={activeId} compact />
      </div>
      <div className="workbench-selector" role="group" aria-label="切换产品原型">
        {products.map((product, index) => (
          <button
            type="button"
            key={product.id}
            aria-pressed={activeId === product.id}
            onClick={() => setActiveId(product.id)}
          >
            <span className="selector-index">0{index + 1}</span>
            <span>{product.label}</span>
            <span className="selector-arrow" aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
    </div>
  );
}
