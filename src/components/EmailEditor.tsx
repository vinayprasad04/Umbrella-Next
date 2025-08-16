import React, { useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import JoditEditor to avoid SSR issues
const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-md"></div>
});

interface EmailEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  height?: number;
}

const EmailEditor: React.FC<EmailEditorProps> = ({ 
  content, 
  onChange, 
  placeholder = 'Enter email content...',
  height = 400 
}) => {
  const editor = useRef(null);

  const config = useMemo(() => ({
    readonly: false,
    placeholder: placeholder,
    height: height,
    minHeight: 300,
    maxHeight: 600,
    spellcheck: true,
    enableDragAndDropFileToEditor: true,
    uploader: {
      insertImageAsBase64URI: true,
    },
    removeButtons: [
      'source',
      'fullsize',
      'about',
      'outdent',
      'indent',
      'video',
      'print',
      'table',
      'fontsize',
      'superscript',
      'subscript',
      'file',
      'cut',
      'selectall',
    ],
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    defaultActionOnPaste: 'insert_clear_html' as any,
    buttons: [
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'ul',
      'ol',
      '|',
      'font',
      'fontsize',
      'brush',
      'paragraph',
      '|',
      'image',
      'link',
      'unlink',
      '|',
      'left',
      'center',
      'right',
      'justify',
      '|',
      'undo',
      'redo',
      '|',
      'hr',
      'eraser',
      'copyformat',
      '|',
      'symbol',
      'fullsize',
    ],
    buttonsMD: [
      'bold',
      'italic',
      'underline',
      '|',
      'ul',
      'ol',
      '|',
      'font',
      'brush',
      'paragraph',
      '|',
      'image',
      'link',
      '|',
      'left',
      'center',
      'right',
      '|',
      'undo',
      'redo',
      '|',
      'eraser',
      'copyformat',
    ],
    buttonsSM: [
      'bold',
      'italic',
      '|',
      'ul',
      'ol',
      '|',
      'font',
      'brush',
      '|',
      'image',
      'link',
      '|',
      'left',
      'center',
      'right',
      '|',
      'undo',
      'redo',
    ],
    buttonsXS: [
      'bold',
      'italic',
      '|',
      'ul',
      'ol',
      '|',
      'font',
      '|',
      'image',
      'link',
      '|',
      'undo',
      'redo',
    ],
    events: {},
    textIcons: false,
    toolbar: true,
    toolbarSticky: false,
    toolbarDisableStickyForMobile: true,
    i18n: {
      en: {
        'Type something': placeholder,
      }
    },
    style: {
      font: '14px Arial, sans-serif',
      color: '#333',
    },
    enter: 'P' as any,
    defaultMode: 1, // WYSIWYG mode
    useSplitMode: false,
    colors: {
      greyscale: [
        '#000000', '#434343', '#666666', '#999999', '#B7B7B7', '#CCCCCC', '#D9D9D9', '#EFEFEF', '#F3F3F3', '#FFFFFF'
      ],
      palette: [
        '#980000', '#FF0000', '#FF9900', '#FFFF00', '#00FF00', '#00FFFF', '#4A86E8', '#0000FF', '#9900FF', '#FF00FF'
      ],
      full: [
        '#E6B8AF', '#F4CCCC', '#FCE5CD', '#FFF2CC', '#D9EAD3', '#D0E0E3', '#C9DAF8', '#CFE2F3', '#D9D2E9', '#EAD1DC',
        '#DD7E6B', '#EA9999', '#F9CB9C', '#FFE599', '#B6D7A8', '#A2C4C9', '#A4C2F4', '#9FC5E8', '#B4A7D6', '#D5A6BD',
        '#CC4125', '#E06666', '#F6B26B', '#FFD966', '#93C47D', '#76A5AF', '#6D9EEB', '#6FA8DC', '#8E7CC3', '#C27BA0',
        '#A61E4D', '#CC0000', '#E69138', '#F1C232', '#6AA84F', '#45818E', '#3C78D8', '#3D85C6', '#674EA7', '#A64D79',
        '#85200C', '#990000', '#B45F06', '#BF9000', '#38761D', '#134F5C', '#1155CC', '#0B5394', '#351C75', '#741B47',
        '#5B0F00', '#660000', '#783F04', '#7F6000', '#274E13', '#0C343D', '#1C4587', '#073763', '#20124D', '#4C1130'
      ]
    },
    colorPickerDefaultTab: 'background' as const,
    imageDefaultWidth: 300,
    removeEmptyBlocks: false,
    cleanHTML: {
      timeout: 300,
      removeEmptyElements: false,
      fillEmptyParagraph: false,
    }
  }), [placeholder, height]);

  return (
    <div className="jodit-editor-wrapper">
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={(newContent: string) => onChange(newContent)}
        onChange={(newContent: string) => {}}
      />
      
      <style jsx global>{`
        .jodit-editor-wrapper .jodit-container {
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
        }
        
        .jodit-editor-wrapper .jodit-toolbar-button {
          margin: 1px;
        }
        
        .jodit-editor-wrapper .jodit-workplace {
          min-height: 300px;
        }
        
        .jodit-editor-wrapper .jodit-wysiwyg {
          padding: 12px;
          font-family: Arial, sans-serif;
          font-size: 14px;
          line-height: 1.5;
        }
        
        .jodit-editor-wrapper .jodit-status-bar {
          border-top: 1px solid #e5e7eb;
          background: #f9fafb;
          font-size: 12px;
          color: #6b7280;
        }
        
        /* Dark mode compatibility */
        .jodit-editor-wrapper .jodit-container.jodit_dark {
          background: #1f2937;
          border-color: #374151;
        }
        
        /* Focus styles */
        .jodit-editor-wrapper .jodit-container:focus-within {
          border-color: #ef4444;
          box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.1);
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .jodit-editor-wrapper .jodit-toolbar {
            flex-wrap: wrap;
          }
          
          .jodit-editor-wrapper .jodit-toolbar-button {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default EmailEditor;