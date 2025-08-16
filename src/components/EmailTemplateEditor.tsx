import React, { useMemo, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import JoditEditor to avoid SSR issues
const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-md flex items-center justify-center">
    <span className="text-gray-500">Loading Rich Text Editor...</span>
  </div>
});

interface EmailTemplateEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  height?: number;
}

const EmailTemplateEditor: React.FC<EmailTemplateEditorProps> = React.memo(({ 
  content, 
  onChange, 
  placeholder = 'Enter email template content...',
  height = 450 
}) => {
  const editor = useRef(null);

  // Memoize the onChange handler to prevent unnecessary re-renders
  const handleChange = useCallback((newContent: string) => {
    // Only call onChange if content actually changed
    if (newContent !== content) {
      onChange(newContent);
    }
  }, [onChange, content]);

  const config = useMemo(() => ({
    readonly: false,
    placeholder: placeholder,
    height: height,
    minHeight: 350,
    maxHeight: 700,
    spellcheck: true,
    enableDragAndDropFileToEditor: true,
    uploader: {
      insertImageAsBase64URI: true,
      imagesExtensions: ['jpg', 'png', 'jpeg', 'gif', 'webp'],
      filesVariableName: 'files[]',
      withCredentials: false,
      pathVariableName: 'path',
      format: 'json',
    },
    filebrowser: {
      ajax: {
        url: '/api/upload'
      },
      height: 400,
    },
    toolbarSticky: false,
    toolbarStickyOffset: 0,
    removeButtons: [
      'source',
      'about',
      'video',
      'file',
      'iframe',
      'fullsize'
    ],
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    defaultActionOnPaste: 'insert_clear_html' as any,
    
    // Email-specific configurations
    enter: 'br' as const, // Use <br> instead of <p> for better email compatibility
    defaultMode: 1, // WYSIWYG mode
    useSplitMode: false,
    
    // Toolbar configuration for email templates
    buttons: [
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'superscript',
      'subscript',
      '|',
      'ul',
      'ol',
      '|',
      'outdent',
      'indent',
      '|',
      'font',
      'fontsize',
      'brush',
      'paragraph',
      '|',
      'image',
      'table',
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
      'print',
    ],
    
    // Medium device buttons
    buttonsMD: [
      'bold',
      'italic',
      'underline',
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
      'table',
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
    ],
    
    // Small device buttons
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
    
    // Extra small device buttons
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
    
    // Color palette optimized for emails
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
        '#CC4125', '#E06666', '#F6B26B', '#FFD966', '#93C47D', '#76A5AF', '#6D9EEB', '#6FA8DC', '#8E7CC3', '#C27BA0'
      ]
    },
    
    // Email-safe font families
    controls: {
      font: {
        list: {
          'Arial,sans-serif': 'Arial',
          'Helvetica,Arial,sans-serif': 'Helvetica',
          'Georgia,serif': 'Georgia',
          'Times,Times New Roman,serif': 'Times New Roman',
          'Courier,monospace': 'Courier',
          'Verdana,sans-serif': 'Verdana',
          'Trebuchet MS,sans-serif': 'Trebuchet MS',
          'Tahoma,sans-serif': 'Tahoma',
        }
      },
      fontsize: {
        list: {
          '8': '8px',
          '9': '9px',
          '10': '10px',
          '11': '11px',
          '12': '12px',
          '14': '14px',
          '16': '16px',
          '18': '18px',
          '24': '24px',
          '30': '30px',
          '36': '36px',
          '48': '48px',
          '60': '60px',
          '72': '72px'
        }
      }
    },
    
    // Events
    events: {
      afterInsertImage: function (image: any) {
        // Ensure images have proper attributes for email
        image.style.maxWidth = '100%';
        image.style.height = 'auto';
        image.setAttribute('alt', image.getAttribute('alt') || 'Email image');
      }
    },
    
    // Reduce unnecessary updates
    observer: {
      timeout: 100
    },
    
    // Optimize for performance
    iframe: false,
    iframeStyle: '',
    iframeCSSLinks: [],
    
    // Clean up HTML for email compatibility
    cleanHTML: {
      timeout: 300,
      removeEmptyElements: false,
      fillEmptyParagraph: false,
      replaceNBSP: false,
      replaceOldTags: {
        'i': 'em' as const,
        'b': 'strong' as const
      }
    },
    
    // Image settings optimized for email
    imageDefaultWidth: 300,
    
    // Table settings
    table: {
      selectionCellStyle: 'border: 1px double #1e88e5 !important;',
      resizable: true,
      draggable: true
    },
    
    // Link settings
    link: {
      followOnDblClick: false,
      processVideoLink: false,
      processPastedLink: true,
      removeLinkAfterFormat: true
    }
  }), [placeholder, height]);

  return (
    <div className="email-template-editor">
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={(newContent: string) => handleChange(newContent)}
        onChange={() => {}}
      />
      
      {/* Variable insertion helper */}
      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Quick Variables:</h4>
        <div className="flex flex-wrap gap-2">
          {['firstName', 'lastName', 'email', 'companyName', 'unsubscribeLink'].map(variable => (
            <button
              key={variable}
              type="button"
              onClick={() => {
                const variableText = `{{${variable}}}`;
                const currentContent = content || '';
                onChange(currentContent + variableText);
              }}
              className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded transition-colors"
            >
              + {`{{${variable}}}`}
            </button>
          ))}
        </div>
        <p className="text-xs text-blue-600 mt-2">
          Click to insert variables, or type them manually in the editor
        </p>
      </div>
      
      <style jsx global>{`
        .email-template-editor .jodit-container {
          border: 2px solid #e5e7eb;
          border-radius: 0.5rem;
          background: white;
        }
        
        .email-template-editor .jodit-toolbar {
          background: #f8fafc;
          border-bottom: 1px solid #e5e7eb;
          border-radius: 0.5rem 0.5rem 0 0;
          padding: 8px;
        }
        
        .email-template-editor .jodit-toolbar-button {
          margin: 1px;
          border-radius: 4px;
          transition: all 0.2s;
        }
        
        .email-template-editor .jodit-toolbar-button:hover {
          background: #e2e8f0;
        }
        
        .email-template-editor .jodit-workplace {
          min-height: 350px;
          background: white;
        }
        
        .email-template-editor .jodit-wysiwyg {
          padding: 16px;
          font-family: Arial, sans-serif;
          font-size: 14px;
          line-height: 1.6;
          color: #333;
          background: white;
        }
        
        .email-template-editor .jodit-status-bar {
          border-top: 1px solid #e5e7eb;
          background: #f8fafc;
          font-size: 11px;
          color: #6b7280;
          padding: 4px 8px;
          border-radius: 0 0 0.5rem 0.5rem;
        }
        
        /* Focus styles */
        .email-template-editor .jodit-container:focus-within {
          border-color: #ef4444;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }
        
        /* Ensure editor popups appear above modal */
        .email-template-editor .jodit-dialog,
        .email-template-editor .jodit-popup,
        .email-template-editor .jodit-tooltip {
          z-index: 10001 !important;
        }
        
        /* Color picker and other floating elements */
        .email-template-editor .jodit-color-picker,
        .email-template-editor .jodit-filebrowser,
        .email-template-editor .jodit-image-editor {
          z-index: 10001 !important;
        }
        
        /* Variable highlighting in editor */
        .email-template-editor .jodit-wysiwyg span[style*="background"] {
          padding: 2px 4px;
          border-radius: 3px;
          font-weight: 500;
        }
        
        /* Responsive toolbar */
        @media (max-width: 768px) {
          .email-template-editor .jodit-toolbar {
            flex-wrap: wrap;
            padding: 6px;
          }
          
          .email-template-editor .jodit-toolbar-button {
            font-size: 12px;
            padding: 4px 6px;
          }
          
          .email-template-editor .jodit-wysiwyg {
            padding: 12px;
            font-size: 13px;
          }
        }
        
        /* Table styles for email compatibility */
        .email-template-editor .jodit-wysiwyg table {
          border-collapse: collapse;
          width: 100%;
          max-width: 100%;
        }
        
        .email-template-editor .jodit-wysiwyg table td,
        .email-template-editor .jodit-wysiwyg table th {
          border: 1px solid #ddd;
          padding: 8px;
          vertical-align: top;
        }
        
        /* Image styles for email compatibility */
        .email-template-editor .jodit-wysiwyg img {
          max-width: 100%;
          height: auto;
          display: block;
        }
      `}</style>
    </div>
  );
});

EmailTemplateEditor.displayName = 'EmailTemplateEditor';

export default EmailTemplateEditor;