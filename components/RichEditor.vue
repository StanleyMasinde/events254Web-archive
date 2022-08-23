<template>
  <div v-if="editor">
    <bubble-menu class="bg-black text-gray-300 rounded-lg px-2 flex gap-2" :tippy-options="{ duration: 100 }"
      :editor="editor">
      <button @click.prevent="editor.chain().focus().toggleBold().run()"
        :class="{ 'text-white': editor.isActive('bold') }">
        Bold
      </button>
      <button @click.prevent="editor.chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }">
        Italic
      </button>
      <button @click.prevent="editor.chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }">
        Strike
      </button>
      <button @click.prevent="editor.chain().focus().toggleUnderline().run()"
        :class="{ 'is-active': editor.isActive('underline') }">
        Strike
      </button>
    </bubble-menu>

    <floating-menu class="bg-gray-300 rounded-lg px-2 flex gap-2" :tippy-options="{ duration: 100 }" :editor="editor">
      <button @click.prevent="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
        H3
      </button>
      <button @click.prevent="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
        H4
      </button>
      <button @click.prevent="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }">
        Bullet List
      </button>
    </floating-menu>
  </div>
  <editor-content :editor="editor" />

  <!-- .ProseMirror -->
</template>

<script>
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/vue-3'

export default {
  components: {
    EditorContent,
    BubbleMenu,
    FloatingMenu
  },

  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },

  emits: ['update:modelValue'],

  data() {
    return {
      editor: null,
    }
  },

  watch: {
    modelValue(value) {
      const isSame = this.editor.getHTML() === value
      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
      ],
      content: this.modelValue,
      editorProps: {
        attributes: {
          class: 'form-input rounded-lg prose prose-sm sm:prose lg:prose-lg xl:prose-2xl w-full focus:outline-none border m-0',
        }
      },
      injectCSS: false,
      onUpdate: () => {
        this.$emit('update:modelValue', this.editor.getHTML())
      },
    })
  },

  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>

