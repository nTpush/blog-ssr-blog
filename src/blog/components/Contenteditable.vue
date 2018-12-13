<template>
  <div
    ref="edit"
    :class="$style['edit-div']"
    placeholder="留下点什么吧~✍"
    v-html="innerText"
    :contenteditable="canEdit"
    @focus="isLocked = true"
    @blur="isLocked = false"
    @input="changeText"
  ></div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "editDiv",
  props: {
    value: {
      type: String,
      default: ""
    },
    canEdit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      innerText: this.value,
      isLocked: false
    };
  },
  watch: {
    value() {
      if (!this.isLocked || !this.innerText) {
        this.innerText = this.value;
      }
    }
  },
  methods: {
    changeText(e) {
      this.$emit("input", this.$el.innerHTML);
    },
    clearContent() {
      this.$el.innerHTML = " "
    }
  }
};
</script>
<style module lang="postcss">
.edit-div {
  min-height: 50px;
  padding: 20px;
  font-size: 18px;
  background: #f5f5fa;
  overflow: auto;
  word-break:break-all;
  line-height: 30px;
}
div[contenteditable]:empty:not(:focus):before {
  content: attr(placeholder);
  color: #cccc;
}
</style>
