<template>
  <div class="code-preview h-full flex flex-col rounded-lg overflow-hidden shadow-xl 
              border border-slate-200 dark:border-slate-700
              transition-all duration-500
              hover:shadow-2xl hover:scale-[1.02] hover:border-blue-300 dark:hover:border-blue-500/50">
    <!-- Header: Filename -->
    <div 
      class="px-4 py-2 border-b bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 transition-colors duration-300"
    >
      <span 
        class="text-sm font-mono text-slate-700 dark:text-slate-300 transition-colors duration-300"
      >
        {{ filename }}
      </span>
    </div>
    
    <!-- Code Content with Line Numbers -->
    <div 
      class="flex flex-1 bg-white dark:bg-[#0D1117] transition-colors duration-300"
    >
      <!-- Line Numbers -->
      <div 
        class="px-3 py-4 text-right select-none font-mono text-sm text-slate-400 dark:text-slate-500 transition-colors duration-300"
      >
        <div v-for="n in lineCount" :key="n" class="leading-6">
          {{ startLine + n - 1 }}
        </div>
      </div>
      
      <!-- Code -->
      <div class="flex-1 px-4 py-4 overflow-x-auto">
        <pre class="font-mono leading-6" style='font-size: 15px'><code 
          class="syntax-highlighted text-slate-800 dark:text-slate-200 transition-colors duration-300"
          v-html="highlightedCode"
        ></code></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useThemeStore } from '@/stores/theme';
import type { CodePreviewProps } from '@/types';

/**
 * CodePreview Component
 * 
 * Displays realistic mock screenshots of plugin output with syntax highlighting
 * 
 * Requirements:
 * - 4.1: Display mock code screenshots with line numbers
 * - 4.2: Display filename and extension
 * - 4.3: Use syntax highlighting colors appropriate for current theme
 * - 4.5: Dark mode uses dark syntax theme colors (#0D1117 background)
 * - 4.6: Light mode uses light syntax theme colors (#FFFFFF background)
 */

const props = withDefaults(defineProps<CodePreviewProps>(), {
  code: '// No code provided',
  language: 'typescript',
  filename: 'example.ts',
  startLine: 1,
  animated: true,
  theme: 'one-dark',
});

const themeStore = useThemeStore();

/**
 * Effective theme - uses prop theme if provided, otherwise uses store theme
 */
const effectiveTheme = computed(() => {
  return props.theme || themeStore.currentTheme;
});

/**
 * Calculate number of lines in the code
 */
const lineCount = computed(() => {
  return props.code.split('\n').length;
});

/**
 * Apply syntax highlighting to code
 * Uses theme-specific colors for keywords, strings, comments, etc.
 */
const highlightedCode = computed(() => {
  let highlighted = props.code;
  
  // Define color schemes for dark and light themes
  const colors = effectiveTheme.value === 'dark' ? {
    keyword: '#FF7B72',
    string: '#A5D6FF',
    comment: '#8B949E',
    function: '#D2A8FF',
    number: '#79C0FF',
    operator: '#FF7B72',
    punctuation: '#C9D1D9'
  } : {
    keyword: '#CF222E',
    string: '#0A3069',
    comment: '#6E7781',
    function: '#8250DF',
    number: '#0550AE',
    operator: '#CF222E',
    punctuation: '#24292F'
  };
  
  // Escape HTML first
  highlighted = highlighted
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  
  // Use placeholders to avoid conflicts
  const placeholders: { [key: string]: string } = {};
  let placeholderIndex = 0;
  
  // Helper function to create placeholder
  const createPlaceholder = (content: string) => {
    const placeholder = `__PLACEHOLDER_${placeholderIndex++}__`;
    placeholders[placeholder] = content;
    return placeholder;
  };
  
  // Highlight comments first (highest priority)
  highlighted = highlighted.replace(
    /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm,
    (match) => createPlaceholder(`<span style="color: ${colors.comment}">${match}</span>`)
  );
  
  // Highlight strings
  highlighted = highlighted.replace(
    /(['"`])((?:\\.|(?!\1).)*?)\1/g,
    (match) => createPlaceholder(`<span style="color: ${colors.string}">${match}</span>`)
  );
  
  // Highlight keywords
  const keywords = [
    'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
    'class', 'interface', 'type', 'import', 'export', 'from', 'default',
    'async', 'await', 'new', 'this', 'extends', 'implements', 'public',
    'private', 'protected', 'static', 'readonly', 'enum', 'namespace'
  ];
  
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
    highlighted = highlighted.replace(regex, (match) => {
      // Check if this keyword is already inside a placeholder
      const beforeMatch = highlighted.substring(0, highlighted.indexOf(match));
      const insidePlaceholder = Object.keys(placeholders).some(ph => beforeMatch.includes(ph));
      if (insidePlaceholder) return match;
      
      return createPlaceholder(`<span style="color: ${colors.keyword}">${match}</span>`);
    });
  });
  
  // Highlight numbers
  highlighted = highlighted.replace(
    /\b(\d+\.?\d*)\b/g,
    (match) => createPlaceholder(`<span style="color: ${colors.number}">${match}</span>`)
  );
  
  // Highlight function names (word followed by parenthesis)
  highlighted = highlighted.replace(
    /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g,
    (match) => createPlaceholder(`<span style="color: ${colors.function}">${match}</span>`)
  );
  
  // Replace placeholders with actual content
  Object.keys(placeholders).forEach(placeholder => {
    highlighted = highlighted.replace(new RegExp(placeholder, 'g'), placeholders[placeholder]);
  });
  
  return highlighted;
});
</script>

<style scoped>
.code-preview {
  /* Ensure horizontal scroll for long lines */
  max-width: 100%;
}

.overflow-x-auto {
  /* Custom scrollbar styling for better appearance */
  scrollbar-width: thin;
  scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
}

.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: rgba(155, 155, 155, 0.5);
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background-color: rgba(155, 155, 155, 0.7);
}

/* Prevent text wrapping in code */
pre {
  white-space: pre;
  margin: 0;
}

code {
  display: block;
}
</style>
