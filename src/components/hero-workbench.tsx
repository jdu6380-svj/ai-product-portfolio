"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const products = [
  { id: "growthos", label: "GrowthOS", description: "把内容策略、选题、生成、评审和反馈串成一条工作流", image: "/growthos/editor.png", alt: "GrowthOS 内容编辑真实界面", relation: ["策略", "选题", "反馈"] },
  { id: "novera", label: "Novera AI", description: "让知识回答回到文档、检索结果和可查看的来源", image: "/novera/preview-evidence.png", alt: "Novera AI 来源证据真实界面", relation: ["文档", "检索", "引用"] },
  { id: "evidra", label: "Evidra", description: "围绕文章主张、原文证据和再次检查组织审查", image: null, alt: "Evidra 产品界面截图待补充", relation: ["主张", "证据", "复核"] },
] as const;

type ProductId = (typeof products)[number]["id"];

export function HeroWorkbench() {
  const [activeId, setActiveId] = useState<ProductId>("growthos");
  const workbenchRef = useRef<HTMLDivElement>(null);
  const activeProduct = products.find((product) => product.id === activeId)!;
  const activeIndex = products.findIndex((product) => product.id === activeId);

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
      <div className="workbench-annotation" aria-hidden="true"><span>产品预览</span><i /><span>{String(activeIndex + 1).padStart(2, "0")} / 03</span></div>
      <div className="workbench-preview" key={activeId}>
        {activeProduct.image ? <figure className="workbench-real-shot"><Image src={activeProduct.image} alt={activeProduct.alt} fill sizes="(max-width: 900px) 100vw, 48vw" priority={activeId === "growthos"} /><figcaption>真实产品界面 · {activeProduct.label}</figcaption></figure> : <div className="workbench-reserved" role="img" aria-label="Evidra 真实产品截图待补充"><span>真实截图待补充</span><strong>Evidra</strong><p>当前保留工作流位置，不使用其他项目素材代替。</p></div>}
        <div className="workbench-relation" aria-label={`${activeProduct.label}工作流关系`}>{activeProduct.relation.map((item, index) => <span key={item}><i>{String(index + 1).padStart(2, "0")}</i>{item}</span>)}</div>
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
