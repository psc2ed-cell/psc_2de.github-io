"use client";

import { useEffect } from "react";

export function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    const topbar = document.querySelector<HTMLElement>(".topbar");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const activeSurfaces = Array.from(
      document.querySelectorAll<HTMLElement>(".hero, .project, .kinetic-break, .profile, .closing, .sequence-cue"),
    );

    root.classList.add("motion-enabled");

    /* ---------- Preloader：入场遮罩 ---------- */
    const preloader = document.querySelector<HTMLElement>(".preloader");
    preloader?.style.removeProperty("display");
    let preloaderTimer: ReturnType<typeof setTimeout> | undefined;
    let preloaderFallbackTimer: ReturnType<typeof setTimeout> | undefined;
    const REEL_DURATION = 1320; // 与 CSS --reel-duration 保持一致
    const navigationEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const legacyPerformance = performance as Performance & { navigation?: { type: number } };
    const isReload = navigationEntry?.type === "reload" || legacyPerformance.navigation?.type === 1;
    let reelSeen = false;
    try {
      reelSeen = sessionStorage.getItem("motion-maker-reel") === "1";
    } catch {
      /* sessionStorage 不可用时按首次访问处理 */
    }

    const finishPreloader = () => {
      clearTimeout(preloaderTimer);
      clearTimeout(preloaderFallbackTimer);
      root.classList.add("is-loaded");
      try {
        sessionStorage.setItem("motion-maker-reel", "1");
      } catch {
        /* ignore */
      }
    };

    if (preloader) {
      if (reducedMotion.matches || (reelSeen && !isReload)) {
        // 减少动态偏好 / 非刷新回访：立即完成，不播动画
        preloader.style.display = "none";
        finishPreloader();
      } else {
        // 首次访问或刷新：播放进度条，结束后上翻揭示页面
        preloaderTimer = setTimeout(finishPreloader, REEL_DURATION);
        // 兜底：即使定时器异常也要保证页面可用
        preloaderFallbackTimer = window.setTimeout(finishPreloader, REEL_DURATION + 2200);
      }
    } else {
      root.classList.add("is-loaded");
    }

    /* ---------- 滚动进入动画 ---------- */
    let observer: IntersectionObserver | undefined;
    let activeObserver: IntersectionObserver | undefined;
    let sectionObserver: IntersectionObserver | undefined;
    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      reveals.forEach((element) => element.classList.add("is-visible"));
      activeSurfaces.forEach((element) => element.classList.add("is-active", "was-active"));
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).classList.add("is-visible");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );
      reveals.forEach((element) => observer?.observe(element));

      activeObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const element = entry.target as HTMLElement;
            element.classList.toggle("is-active", entry.isIntersecting);
            if (entry.isIntersecting) element.classList.add("was-active");
          });
        },
        { threshold: 0.04, rootMargin: "8% 0px 8% 0px" },
      );
      activeSurfaces.forEach((element) => activeObserver?.observe(element));

      const sections = Array.from(document.querySelectorAll<HTMLElement>("#works, #scope, #profile"));
      const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav a[href^='#']"));
      sectionObserver = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (!visible) return;
          const target = `#${(visible.target as HTMLElement).id}`;
          navLinks.forEach((link) => {
            if (link.getAttribute("href") === target) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        },
        { threshold: [0.08, 0.2, 0.45], rootMargin: "-25% 0px -55% 0px" },
      );
      sections.forEach((section) => sectionObserver?.observe(section));
    }

    /* ---------- 滚动进度 ---------- */
    let scrollFrame = 0;
    const updateScrollProgress = () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        const available = document.documentElement.scrollHeight - window.innerHeight;
        const progress = available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0;
        root.style.setProperty("--page-progress", progress.toFixed(4));
        topbar?.classList.toggle("is-scrolled", window.scrollY > 24);
      });
    };
    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);

    /* ---------- 磁吸元素 ---------- */
    const magneticElements = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const magneticCleanups = magneticElements.map((element) => {
      const onMove = (event: PointerEvent) => {
        if (!finePointer.matches || reducedMotion.matches) return;
        const rect = element.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
        element.style.setProperty("--magnet-x", `${x.toFixed(2)}px`);
        element.style.setProperty("--magnet-y", `${y.toFixed(2)}px`);
      };
      const onLeave = () => {
        element.style.setProperty("--magnet-x", "0px");
        element.style.setProperty("--magnet-y", "0px");
      };
      element.addEventListener("pointermove", onMove);
      element.addEventListener("pointerleave", onLeave);
      return () => {
        element.removeEventListener("pointermove", onMove);
        element.removeEventListener("pointerleave", onLeave);
      };
    });

    /* ---------- 视频播放状态 ---------- */
    const videos = Array.from(document.querySelectorAll<HTMLVideoElement>(".project__media video"));
    const syncVideoState = () => {
      root.classList.toggle("video-playing", videos.some((video) => !video.paused && !video.ended));
    };
    const videoCleanups = videos.map((video) => {
      const frame = video.closest<HTMLElement>(".project__media");
      const setState = (state: "ready" | "playing" | "paused") => {
        if (frame) frame.dataset.playback = state;
      };
      const onPlay = () => {
        if (video.paused || video.ended) return;
        videos.forEach((otherVideo) => {
          if (otherVideo !== video && !otherVideo.paused && !otherVideo.ended) {
            otherVideo.pause();
          }
        });
        setState("playing");
        syncVideoState();
      };
      const onPause = () => {
        setState(video.ended ? "ready" : "paused");
        syncVideoState();
      };
      const onEnded = () => {
        setState("ready");
        syncVideoState();
      };
      const onContextMenu = (event: MouseEvent) => {
        event.preventDefault();
      };
      setState("ready");
      video.addEventListener("play", onPlay);
      video.addEventListener("pause", onPause);
      video.addEventListener("ended", onEnded);
      video.addEventListener("contextmenu", onContextMenu);
      return () => {
        video.removeEventListener("play", onPlay);
        video.removeEventListener("pause", onPause);
        video.removeEventListener("ended", onEnded);
        video.removeEventListener("contextmenu", onContextMenu);
        if (frame) delete frame.dataset.playback;
      };
    });

    /* ---------- 页面可见性 ---------- */
    const onVisibilityChange = () => {
      root.classList.toggle("is-page-hidden", document.hidden);
    };
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      clearTimeout(preloaderTimer);
      clearTimeout(preloaderFallbackTimer);
      observer?.disconnect();
      activeObserver?.disconnect();
      sectionObserver?.disconnect();
      cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
      magneticCleanups.forEach((cleanup) => cleanup());
      videoCleanups.forEach((cleanup) => cleanup());
      document.removeEventListener("visibilitychange", onVisibilityChange);
      document.querySelectorAll(".nav a[aria-current]").forEach((link) => link.removeAttribute("aria-current"));
      root.classList.remove("motion-enabled", "pointer-live", "is-page-hidden", "video-playing");
    };
  }, []);

  return null;
}

