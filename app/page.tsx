import { MotionController } from "./MotionController";

const projects = [
  {
    index: "01",
    title: "YU7 GT",
    english: "XIAOMI YU7 GT / SPEC FILM",
    category: "非商用汽车概念 TVC",
    duration: "00:40",
    format: "1080P / 24 FPS",
    note: "个人概念作品 / 非官方",
    description:
      "从暗棚揭车、GT 启动与方向盘特写，到赛道追拍、海岸夜路与霓虹城市，用冷蓝黑与红色尾灯完成由静至动的性能表达。",
    video: "media/project-yu7.mp4",
    poster: "media/poster-yu7.webp",
    accent: "acid",
  },
  {
    index: "02",
    title: "等一束光",
    english: "WAITING FOR A LIGHT",
    category: "情感剧情短片",
    duration: "00:54",
    format: "1080P / 30 FPS",
    note: "完整成片",
    description:
      "医院长廊里，一束红玫瑰连接等待、误解与温柔回应。以克制的表演和干净的空间调度承载情绪。",
    video: "media/project-light.mp4",
    poster: "media/poster-light.webp",
    accent: "blue",
  },
  {
    index: "03",
    title: "穿成镇北王，谁惯着退婚长公主",
    english: "VALIANT PRINCE",
    category: "穿越漫剧 · 古装玄幻",
    duration: "01:59",
    format: "1080P / 25 FPS",
    note: "展示版含原始水印",
    description:
      "以堂审、人物对峙与兵刃动作推进大殿冲突，用人物近景和群像站位持续抬高近两分钟场面的戏剧张力。",
    video: "media/project-upgrade.mp4",
    poster: "media/poster-upgrade.webp",
    accent: "orange",
  },
  {
    index: "04",
    title: "退婚后，他闪耀人生",
    english: "AFTER THE BREAKUP",
    category: "现代情感短剧",
    duration: "00:56",
    format: "1080P / 30 FPS",
    note: "展示版含原始水印",
    description:
      "咖啡馆里，电话、桌号与等待交织成一次错位会面。暖色空间与克制近景，让两个人身处咫尺却始终没有真正相见。",
    video: "media/project-breakoff.mp4",
    poster: "media/poster-breakoff.webp",
    accent: "rose",
  },
];

const capabilities = [
  ["01", "3D 国风漫剧", "角色、场景、动作与连续叙事"],
  ["02", "情感剧情", "表演、情绪与生活化空间"],
  ["03", "都市短剧", "对话节奏与人物关系推进"],
  ["04", "汽车影像", "产品质感、速度与声音设计"],
];

/** 电影场记板过场：SCENE 编号 + 拍板动画，连接两个章节。 */
function SceneSlate({ index, label }: { index: string; label: string }) {
  return (
    <div className="scene-slate" data-reveal="clip" aria-hidden="true">
      <div className="scene-slate__rail" />
      <div className="scene-slate__inner">
        <span className="scene-slate__tag">SCENE {index}</span>
        <div className="scene-slate__board">
          <i />
          <i />
          <b>REC</b>
        </div>
        <span className="scene-slate__next">{label}</span>
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
          <a href="#works" data-magnetic>作品</a>
          <a href="#scope" data-magnetic>方向</a>
          <a href="#profile" data-magnetic>个人信息</a>
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
            <span>BASED IN 杭州</span>
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
                <span>3D 漫剧 · 情感短片 · 汽车影像</span>
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
              所有作品画面只存在于独立播放器中。
              <br />
              网站背景不使用任何成片帧。
            </p>
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <article
                className={`project project--${project.accent}`}
                id={`work-${project.index}`}
                key={project.index}
              >
                <div className="project__header" data-reveal={Number(project.index) % 2 ? "left" : "right"}>
                  <span className="project__number">{project.index}</span>
                  <div>
                    <span className="project__category">{project.category}</span>
                    <h3>{project.title}</h3>
                    <p lang="en">{project.english}</p>
                  </div>
                  <span className="project__duration">{project.duration}</span>
                </div>

                <div className="project__media" data-reveal="clip">
                  <div className="monitor-bar">
                    <span><i /> MASTER / {project.index}</span>
                    <span>{project.format}</span>
                  </div>
                  <div className="monitor-screen">
                    <video
                      controls
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
                  <dl>
                    <div><dt>TYPE</dt><dd>{project.category}</dd></div>
                    <div><dt>DELIVERY</dt><dd>{project.format}</dd></div>
                    <div><dt>NOTE</dt><dd>{project.note}</dd></div>
                  </dl>
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

        <SceneSlate index="02" label="PLATFORM RECORD" />

        <section className="record section" aria-labelledby="record-title">
          <div className="record__copy" data-reveal="left">
            <span className="section-index">03 / PLATFORM RECORD</span>
            <h2 id="record-title">平台记录，保留原始证据。</h2>
            <p>
              本人参与制作的《穿成镇北王，谁惯着退婚长公主》位列红果漫剧新剧榜内。
              此处保留原始截图作为成绩留档，幕位、数据归属与日期均以原图为准。
            </p>
            <span className="record__note">ORIGINAL SCREENSHOT / UNEDITED CONTENT</span>
          </div>
          <figure className="record__image" data-reveal="right">
            <img
              src="media/platform-record.webp"
              alt="红果平台漫剧新剧榜榜单原始截图"
              loading="lazy"
              decoding="async"
              width="900"
              height="2000"
            />
            <figcaption>平台榜单成绩截图 · 项目对应关系与数据口径待本人确认</figcaption>
          </figure>
        </section>

        <SceneSlate index="03" label="PROFILE SPACE" />

        <section className="profile section" id="profile" aria-labelledby="profile-title">
          <div className="profile__portrait" aria-label="个人形象照片预留区域" data-reveal="scale">
            <div className="portrait-placeholder" aria-hidden="true">
              <span className="portrait-placeholder__orbit" />
              <span className="portrait-placeholder__axis" />
              <strong>PORTRAIT</strong>
              <small>个人形象图预留 / 1:1</small>
            </div>
          </div>

          <div className="profile__content" data-reveal="right">
            <span className="section-index">04 / PROFILE SPACE</span>
            <p className="profile__eyebrow">AI 影像创作者 / DIRECTOR</p>
            <h2 id="profile-title">毛大明 / MAO DAMING</h2>
            <p className="profile__bio">
              AI 影像创作者与导演，专注 AIGC 驱动的内容生产，作品覆盖 3D 国风漫剧、情感短剧与汽车概念影像。
              从角色塑造、情绪调度到连续叙事，追求"把想象推进到下一帧"的镜头表达；
              熟悉从创意、分镜到成片的 AI 制作全流程，期待与团队共创下一部作品。
            </p>

            <div className="profile__fields">
              <div>
                <span>ROLE / 职业定位</span>
                <strong>AI 影像创作者 / 导演</strong>
              </div>
              <div>
                <span>LOCATION / 期望就业城市</span>
                <strong>江浙沪</strong>
              </div>
              <div>
                <span>EDUCATION / 学历</span>
                <strong>大专（全日制）</strong>
              </div>
            </div>

            <div className="profile__contact" aria-label="联系方式区域">
              <div><span>EMAIL / 邮箱</span><strong>psc_2ed@outlook.com</strong></div>
              <details className="phone-reveal">
                <summary>
                  <span>PHONE / 手机号</span>
                  <i aria-hidden="true">点击显示</i>
                </summary>
                <strong>13206872352</strong>
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
            <a className="button button--primary" href="mailto:psc_2ed@outlook.com" data-magnetic>
              <span>联系我</span> <b aria-hidden="true">↗</b>
            </a>
            <a className="button button--ghost" href="#top" data-magnetic><span>返回顶部</span> <b aria-hidden="true">↑</b></a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__brand">MOTION <span>/</span> MAKER</div>
        <div className="footer__legal">
          <p>个人作品集；部分项目包含 AIGC 生成 / 辅助画面与合成音频。网页使用轻量代理版本，原始成片保持不变。</p>
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
