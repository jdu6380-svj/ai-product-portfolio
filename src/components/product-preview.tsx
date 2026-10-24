import Link from "next/link";

type ProductPreviewProps = { variant: "evidra" | "growthos" | "novera"; compact?: boolean };

const previewCopy = {
  evidra: { eyebrow: "Evidra / 分析", title: "证据审查", metric: "·", metricLabel: "内容信号", signal: "让每个论点都连接到可查看的依据。", rows: ["论点 01　证据来源", "论点 02　段落上下文", "论点 03　修改方向"] },
  growthos: { eyebrow: "GrowthOS / 工作流", title: "内容运营系统", metric: "·", metricLabel: "工作流", signal: "下一项内容决策已进入评审。", rows: ["品牌背景　已就绪", "选题简报　进行中", "草稿评审　已安排"] },
  novera: { eyebrow: "Novera AI / 回答", title: "知识回答", metric: "·", metricLabel: "知识流程", signal: "回答关联团队知识与来源依据。", rows: ["政策手册　来源 01", "团队笔记　来源 02", "项目档案　来源 03"] },
};

export function ProductPreview({ variant, compact = false }: ProductPreviewProps) {
  const copy = previewCopy[variant];
  return <div className={`product-preview preview-${variant} ${compact ? "preview-compact" : ""}`} aria-label={`${copy.title}产品预览`}><div className="preview-topbar"><span className="preview-dots"><i /><i /><i /></span><span>{copy.eyebrow}</span><span className="preview-status">原型</span></div><div className="preview-body"><div className="preview-sidebar"><span className="sidebar-logo">{variant === "evidra" ? "E" : variant === "growthos" ? "G" : "N"}</span><span /><span /><span /><span /></div><div className="preview-main"><div className="preview-heading"><div><small>工作区 / 今天</small><h3>{copy.title}</h3></div><span aria-hidden="true">···</span></div><div className="preview-signal"><div className="signal-ring"><strong>{copy.metric}</strong><span>{copy.metricLabel}</span></div><div className="signal-copy"><span className="signal-kicker">当前信号</span><p>{copy.signal}</p><Link href="/#thinking">查看判断依据 <span>→</span></Link></div></div><div className="preview-table">{copy.rows.map((row, index) => <div className="preview-row" key={row}><span className={`row-index row-index-${index}`}>0{index + 1}</span><span>{row}</span><span className="row-arrow">↗</span></div>)}</div></div></div></div>;
}
