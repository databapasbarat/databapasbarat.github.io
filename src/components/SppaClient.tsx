"use client";

import { useEffect, useState } from 'react';
import mermaid from 'mermaid';
import html2canvas from 'html2canvas';
import SppaContent from './SppaContent';

// Helper to toggle fullscreen
const toggleFullscreen = (element: HTMLElement | null) => {
  if (!element) return;
  if (!document.fullscreenElement) {
    element.requestFullscreen().catch(err => {
      alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });
  } else {
    document.exitFullscreen();
  }
};

// Helper to download diagram
const downloadDiagram = (container: HTMLElement | null, filename: string) => {
  if (!container) return;
  html2canvas(container).then(canvas => {
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
};


export default function SppaClient() {
  const [activeTab, setActiveTab] = useState('asas');

  // Initialize theme and mermaid on mount
  useEffect(() => {
    // Theme setup
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const isDark = localStorage.getItem('theme') === 'dark' ||
                   (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const updateTheme = (dark: boolean) => {
        document.documentElement.classList.toggle('dark', dark);
        localStorage.setItem('theme', dark ? 'dark' : 'light');
        if (themeIcon) {
            themeIcon.innerHTML = dark
                ? `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012.708 12.708z" />`
                : `<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />`;
        }
        // Re-init mermaid with new theme
        mermaid.initialize({
            startOnLoad: false,
            theme: dark ? 'dark' : 'default',
            flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis' }
        });
        mermaid.init(undefined, ".mermaid");
    };

    updateTheme(isDark);

    const handleThemeClick = () => {
        const isDark = document.documentElement.classList.contains('dark');
        updateTheme(!isDark);
    };

    themeToggle?.addEventListener('click', handleThemeClick);

    // Scroll to top
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    const handleScroll = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    scrollToTopBtn?.addEventListener('click', handleScroll);

    // Diagram buttons
    const downloadBtn = document.getElementById('download-diagram-btn');
    const fullscreenBtn = document.getElementById('fullscreen-diagram-btn');
    const diagramContainer = document.getElementById('diversi-diagram-container');

    const handleDownload = () => downloadDiagram(diagramContainer, 'Alur-Diversi.png');
    const handleFullscreen = () => toggleFullscreen(diagramContainer);

    downloadBtn?.addEventListener('click', handleDownload);
    fullscreenBtn?.addEventListener('click', handleFullscreen);

    // Mermaid Init
    mermaid.initialize({
        startOnLoad: false,
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default',
        flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis' }
    });
    mermaid.init(undefined, ".mermaid");

    // Cleanup
    return () => {
        themeToggle?.removeEventListener('click', handleThemeClick);
        scrollToTopBtn?.removeEventListener('click', handleScroll);
        downloadBtn?.removeEventListener('click', handleDownload);
        fullscreenBtn?.removeEventListener('click', handleFullscreen);
    };
  }, []);

  // Handle tab switching
  useEffect(() => {
    const tabButtons = document.querySelectorAll('[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');

    const handleTabClick = (e: Event) => {
        const button = e.currentTarget as HTMLButtonElement;
        const tabId = button.getAttribute('data-tab');
        if (tabId) {
            setActiveTab(tabId);
        }
    };

    tabButtons.forEach(button => {
        button.addEventListener('click', handleTabClick);
    });

    tabContents.forEach(content => {
        const contentId = content.id;
        if (contentId === activeTab) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });

    tabButtons.forEach(button => {
        const tabId = button.getAttribute('data-tab');
        if (tabId === activeTab) {
            button.classList.add('tab-active');
        } else {
            button.classList.remove('tab-active');
        }
    });

    // Re-render mermaid if the new tab has a diagram
    const activeContent = document.getElementById(activeTab);
    if (activeContent?.querySelector('.mermaid')) {
        mermaid.init(undefined, `#${activeTab} .mermaid`);
    }

    return () => {
        tabButtons.forEach(button => {
            button.removeEventListener('click', handleTabClick);
        });
    }
  }, [activeTab]);

  return <SppaContent />;
}
