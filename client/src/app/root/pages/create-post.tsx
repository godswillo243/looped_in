import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function CreatePost() {
  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content: "", // initial content
  });

  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) return null;

      return {
        isEditable: editor.isEditable,
        currentSelection: editor.state.selection,
        currentContent: editor.getText(),

        isBold: editor.isActive("bold"),
        isItalic: editor.isActive("italic"),
      };
    },
  });

  return (
    <article className="w-full min-h-full">
      <div className="border rounded-xl p-3 shadow-sm">
        <EditorContent
          editor={editor}
          className="min-h-[120px] focus:outline-none"
        />

        {/* Post button */}
        <div className="flex justify-end mt-3">
          <button
            onClick={() => console.log(editor.getHTML())}
            className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-700"
          >
            Post
          </button>
        </div>
      </div>
    </article>
  );
}
export default CreatePost;
