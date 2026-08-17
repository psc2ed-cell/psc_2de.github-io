import type { CSSProperties } from "react";
import { MotionController } from "./MotionController";

const videoBaseUrl = process.env.NEXT_PUBLIC_VIDEO_BASE_URL?.trim().replace(/\/+$/, "");

function getVideoUrl(filename: string) {
  return videoBaseUrl ? `${videoBaseUrl}/${filename}` : `media/${filename}`;
}

const projects = [
  {
    index: "01",
    title: "升级有奖",
    english: "VALIANT PRINCE",
    category: "古装玄幻",
    duration: "01:59",
    description:
      "以堂审、人物对峙与兵刃动作推进大殿冲突，用人物近景和群像站位持续抬高近两分钟场面的戏剧张力。",
    video: getVideoUrl("project-upgrade.mp4"),
    poster: "covers/poster-upgrade.jpg",
    accent: "orange",
  },
  {
    index: "02",
    title: "退婚后，她闪耀人生",
    english: "AFTER THE BREAKUP",
    category: "现代情感短剧",
    duration: "00:56",
    description:
      "咖啡馆里，电话、桌号与等待交织成一次错位会面。暖色空间与克制近景，让两个人身处咫尺却始终没有真正相见。",
    video: getVideoUrl("project-breakoff.mp4"),
    poster: "covers/poster-breakoff.png",
    accent: "rose",
  },
  {
    index: "03",
    title: "高手下山，我不当赘婿",
    english: "MASTER DESCENDS",
    category: "都市玄幻 AI 短剧",
    duration: "01:42",
    note: "全链路制作",
    description:
      "参与赌场对峙单元全链路制作：基于剧本拆解作弊揭穿与身份反转，统筹角色、赌场场景及扑克牌、面具等关键资产；推进镜头生成与节点迭代，校准群像站位、人物一致性、视线衔接和面具破碎动作，完成剪辑、字幕、声音及竖屏成片输出。",
    video: getVideoUrl("project-master-descends.mp4"),
    poster: "media/poster-master-descends.webp",
    accent: "blue",
  },
  {
    index: "04",
    title: "XIAOMI YU7 GT / SPEC FILM",
    english: "XIAOMI YU7 GT / SPEC FILM",
    category: "个人非商用 TVC",
    duration: "00:40",
    note: "个人概念作品 / 非官方",
    description:
      "从暗棚揭车、GT 启动与方向盘特写，到赛道追拍、海岸夜路与霓虹城市，用冷蓝黑与红色尾灯完成由静至动的性能表达。",
    video: getVideoUrl("project-yu7.mp4"),
    poster: "media/poster-yu7.webp",
    accent: "acid",
  },
];

const capabilities = [
  ["01", "3D 国风漫剧", "角色、场景、动作与连续叙事"],
  ["02", "情感剧情", "表演、情绪与生活化空间"],
  ["03", "都市玄幻短剧", "动作、悬念与身份反转"],
  ["04", "汽车影像", "产品质感、速度与声音设计"],
];

/** 剪辑时间线章节提示：用监看台语言衔接章节，并同步显示真实进度。 */
function SequenceCue({
  index,
  label,
  detail,
  total = "06",
  compact = false,
}: {
  index: string;
  label: string;
  detail: string;
  total?: string;
  compact?: boolean;
}) {
  const currentStep = Number.parseInt(index, 10);
  const totalSteps = Number.parseInt(total, 10);
  const safeTotal = Number.isFinite(totalSteps) && totalSteps > 0 ? totalSteps : 1;
  const safeCurrent = Number.isFinite(currentStep) ? Math.min(Math.max(currentStep, 1), safeTotal) : 1;
  const progress = safeTotal > 1 ? ((safeCurrent - 1) / (safeTotal - 1)) * 100 : 100;
  const markers = Array.from({ length: safeTotal }, (_, markerIndex) => markerIndex + 1);
  const cueStyle = { "--cue-progress": `${progress}%` } as CSSProperties;

  return (
    <div
      className={`sequence-cue${compact ? " sequence-cue--compact" : ""}`}
      data-scene={index}
      data-reveal="clip"
      style={cueStyle}
      aria-hidden="true"
    >
      <div className="sequence-cue__inner">
        <div className="sequence-cue__number">
          <span>NEXT / SEQUENCE</span>
          <strong>{index}</strong>
          <small>CHAPTER {index} / {String(safeTotal).padStart(2, "0")}</small>
        </div>

        <div className="sequence-cue__console">
          <div className="sequence-cue__status">
            <span><i /> SEQ {index} READY</span>
            <span>MASTER TIMELINE / 2026</span>
          </div>

          <strong className="sequence-cue__title">{label}</strong>
          <span className="sequence-cue__detail">{detail}</span>

          <div className="sequence-cue__timeline">
            <div className="sequence-cue__track">
              {markers.map((marker) => (
                <i className={marker <= safeCurrent ? "is-complete" : undefined} key={marker} />
              ))}
              <b />
            </div>
            <div className="sequence-cue__markers">
              {markers.map((marker) => (
                <span key={marker}>{String(marker).padStart(2, "0")}</span>
              ))}
            </div>
            <span className="sequence-cue__timecode">TC 00:{index}:00:00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <MotionController />

      {/* 入场遮罩：品牌字 + 加载进度条，完成后整屏上翻揭示 hero */}
      <div className="preloader" aria-hidden="true">
        <span className="preloader__grid" />
        <div className="preloader__brand">
          <span className="preloader__line preloader__line--outline">MOTION</span>
          <span className="preloader__line preloader__line--solid">MAKER</span>
        </div>
        <div className="preloader__progress"><i /></div>
        <span className="preloader__meta preloader__meta--a">LOADING REEL · 2026</span>
        <span className="preloader__meta preloader__meta--b">FRAME 0004 / 0004</span>
        <span className="preloader__corner preloader__corner--tl" />
        <span className="preloader__corner preloader__corner--tr" />
        <span className="preloader__corner preloader__corner--bl" />
        <span className="preloader__corner preloader__corner--br" />
      </div>

      <a className="skip-link" href="#main-content">
        跳到主要内容
      </a>
      <div className="ambient" aria-hidden="true">
        <span className="ambient__grid" />
        <span className="ambient__beam ambient__beam--one" />
        <span className="ambient__beam ambient__beam--two" />
        <span className="ambient__scan" />
      </div>

      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="返回网站顶部">
          <span>PORTFOLIO</span>
          <small>AI MOTION / 2026</small>
        </a>
        <nav className="nav" aria-label="主要导航">
          <a href="#works">作品</a>
          <a href="#scope">方向</a>
          <a href="#profile">个人信息</a>
        </nav>
        <div className="signal-tag">
          <i aria-hidden="true" /> 04 FILMS / ONLINE
        </div>
        <div className="scroll-progress" aria-hidden="true"><span /></div>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero__meta">
            <span>AI FILM / STORY / COMMERCIAL</span>
            <span>END-TO-END AIGC PRODUCTION</span>
          </div>

          <div className="hero__copy">
            <p className="hero__kicker">PERSONAL SHOWREEL · SELECTED WORKS</p>
            <h1 id="hero-title">
              <span className="hero__outline">MAKE</span>
              <span className="hero__solid">MOTION</span>
            </h1>
            <div className="hero__bottom">
              <p>
                把想象，
                <br />
                推进到下一帧。
              </p>
              <div>
                <span>3D 漫剧 · 都市玄幻短剧 · 情感短剧 · 汽车影像</span>
                <a className="button button--primary" href="#works" data-magnetic>
                  <span>浏览全部作品</span> <b aria-hidden="true">↘</b>
                </a>
              </div>
            </div>
          </div>

          <div className="motion-engine" aria-hidden="true">
            <div className="motion-engine__ring motion-engine__ring--outer" />
            <div className="motion-engine__ring motion-engine__ring--middle" />
            <div className="motion-engine__ring motion-engine__ring--inner" />
            <div className="motion-engine__axis motion-engine__axis--x" />
            <div className="motion-engine__axis motion-engine__axis--y" />
            <div className="motion-engine__core">
              <strong>04</strong>
              <span>SELECTED FILMS</span>
            </div>
            <span className="engine-readout engine-readout--a">SIGNAL / ACTIVE</span>
            <span className="engine-readout engine-readout--b">FRAME / 0001</span>
            <span className="engine-readout engine-readout--c">MOTION / FORWARD</span>
          </div>

          <div className="hero__ticker" aria-hidden="true">
            <div>
              STORY · CHARACTER · EMOTION · PERFORMANCE · SPEED · STORY · CHARACTER · EMOTION · PERFORMANCE · SPEED ·
            </div>
          </div>
        </section>

        <section className="works section" id="works" aria-labelledby="works-title">
          <div className="section-heading" data-reveal="up">
            <div>
              <span className="section-index">01 / SELECTED WORKS</span>
              <h2 id="works-title">四部成片，四种推进方式。</h2>
            </div>
            <p>
              从完整成片出发，呈现不同题材中的叙事、表演与节奏控制。
              <br />
              点击播放器，即可观看高清展示版。
            </p>
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <article
                className={`project project--${project.accent}`}
                id={`work-${project.index}`}
                key={project.index}
                aria-label={`作品：${project.title}`}
              >
                <SequenceCue
                  index={project.index}
                  label={project.title}
                  detail={project.english}
                  total="05"
                  compact
                />

                <div className="project__header" data-reveal={Number(project.index) % 2 ? "left" : "right"}>
                  <span className="project__number">{project.index}</span>
                  <div>
                    <span className="project__category">{project.category}</span>
                  </div>
                  <span className="project__duration">{project.duration}</span>
                </div>

                <div className="project__media" data-reveal="clip">
                  <div className="monitor-bar">
                    <span><i /> MASTER / {project.index}</span>
                  </div>
                  <div className="monitor-screen">
                    {/* Showcase masters contain their original baked presentation; separate caption tracks were not supplied. */}
                    {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                    <video
                      controls
                      controlsList="nodownload"
                      playsInline
                      preload="none"
                      poster={project.poster}
                      aria-label={`播放《${project.title}》完整成片`}
                    >
                      <source src={project.video} type="video/mp4" />
                      你的浏览器暂不支持视频播放。
                    </video>
                    <span className="corner corner--tl" aria-hidden="true" />
                    <span className="corner corner--tr" aria-hidden="true" />
                    <span className="corner corner--bl" aria-hidden="true" />
                    <span className="corner corner--br" aria-hidden="true" />
                  </div>
                </div>

                <div className="project__footer" data-reveal="up">
                  <p>{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="kinetic-break" aria-label="动态视觉过场：保持向前">
          <div className="kinetic-break__stage" aria-hidden="true">
            <span className="kinetic-break__word kinetic-break__word--top"><i>KEEP</i></span>
            <span className="kinetic-break__word kinetic-break__word--bottom"><i>MOVING</i></span>
            <div className="signal-tunnel">
              <i /><i /><i /><i /><i /><i />
              <span>∞</span>
            </div>
            <div className="signal-tracer"><b /><b /><b /><b /><b /></div>
          </div>
          <p>IMAGINATION → FRAME → MOTION → STORY</p>
        </section>

        <section className="scope section" id="scope" aria-labelledby="scope-title">
          <div className="scope__intro" data-reveal="left">
            <span className="section-index">02 / CREATIVE RANGE</span>
            <h2 id="scope-title">
              同一套影像语言，
              <br />
              穿过不同类型。
            </h2>
          </div>

          <ol className="capability-grid">
            {capabilities.map(([index, title, description]) => (
              <li key={index} data-reveal="scale" style={{ transitionDelay: `${Number(index) * 55}ms` }}>
                <span>{index}</span>
                <h3>{title}</h3>
                <p>{description}</p>
                <i aria-hidden="true" />
              </li>
            ))}
          </ol>
        </section>

        <SequenceCue
          index="05"
          label="PROFILE SPACE"
          detail="CREATOR / CONTACT / AVAILABILITY"
          total="05"
        />

        <section className="profile section" id="profile" aria-labelledby="profile-title">
          <div
            className="profile__portrait"
            aria-label="Peter Mao 的 AI 影像创作者个人标识"
            role="img"
            data-reveal="scale"
          >
            <div className="profile-card" aria-hidden="true">
              <span className="profile-card__meta">CREATIVE PROFILE / 2026</span>
              <strong className="profile-card__monogram"><i>P</i><em>/</em><i>M</i></strong>
              <div className="profile-card__identity">
                <b>PETER MAO</b>
                <small>AI FILM CREATOR / DIRECTOR</small>
              </div>
              <span className="profile-card__count">SELECTED WORKS / 04</span>
            </div>
          </div>

          <div className="profile__content" data-reveal="right">
            <span className="section-index">03 / PROFILE SPACE</span>
            <p className="profile__eyebrow">AI 影像创作者 / DIRECTOR</p>
            <h2 id="profile-title">毛大明 / Peter</h2>
            <p className="profile__bio">
              AI 影像创作者与导演，专注 AIGC 驱动的内容生产，作品覆盖 3D 国风漫剧、都市玄幻 AI 短剧、情感短剧与汽车概念影像。
              从角色塑造、情绪调度到连续叙事，追求“把想象推进到下一帧”的镜头表达；
              熟悉从创意、分镜到成片的 AI 制作全流程，期待与团队共创下一部作品。
            </p>

            <div className="profile__fields">
              <div>
                <span>ROLE / 职业定位</span>
                <strong>AI 影像创作者 / 导演</strong>
              </div>
              <div>
                <span>EDUCATION / 学历</span>
                <strong>大专（全日制）</strong>
              </div>
            </div>

            <div className="profile__contact" aria-label="联系方式区域">
              <a href="mailto:psc_2ed@outlook.com" aria-label="发送邮件至 psc_2ed@outlook.com">
                <span>EMAIL / 邮箱</span>
                <strong>psc_2ed@outlook.com</strong>
              </a>
              <details className="phone-reveal">
                <summary>
                  <span>PHONE / 手机号</span>
                  <i aria-hidden="true" />
                </summary>
                <a className="phone-reveal__number" href="tel:13206872352" aria-label="拨打 13206872352">
                  13206872352
                </a>
              </details>
            </div>
          </div>
        </section>

        <section className="closing section" aria-labelledby="closing-title">
          <div className="closing__signal" aria-hidden="true"><i /><i /><i /></div>
          <span className="section-index" data-reveal="up">NEXT FRAME / NEXT STORY</span>
          <h2 id="closing-title" data-reveal="left">
            下一部作品，
            <br />
            从这里开始。
          </h2>
          <p data-reveal="up">从漫剧到情感短剧，从都市故事到汽车影像——让想象抵达下一帧。</p>
          <div className="closing__cta" data-reveal="up">
            <a
              className="button button--primary"
              href="./resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              type="application/pdf"
              aria-label="在新标签页查看毛大明的简历（PDF）"
              data-magnetic
            >
              <span>我的简历</span> <b aria-hidden="true">↗</b>
            </a>
            <a className="button button--ghost" href="#top" data-magnetic><span>返回顶部</span> <b aria-hidden="true">↑</b></a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__brand">MOTION <span>/</span> MAKER</div>
        <div className="footer__legal">
          <p>个人作品集；部分项目包含 AIGC 生成 / 辅助画面与合成音频。网页使用高清展示版本，兼顾原画质与在线播放体验。</p>
          <p>
            YU7 GT 为非商用、非官方个人概念作品，与小米集团无隶属或合作关系；
            Xiaomi、小米及相关产品素材与商标归各自权利人所有。
          </p>
        </div>
        <span>© 2026 毛大明</span>
      </footer>
    </>
  );
}
