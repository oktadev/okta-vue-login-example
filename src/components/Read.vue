<template>
  <div class="content">
    <md-button class="md-raised" v-if="isEditor"><router-link to="edit">Edit</router-link></md-button>
    <div v-html="compiledMarkdown"></div>
  </div>
</template>

<script>
import marked from 'marked';
import { getContent } from '../service/content';
import { isInGroup } from '../auth-guards'

export default {
  name: 'Read',
  data: () => ({
    isEditor: false
  }),
  computed: {
    compiledMarkdown: function() {
      const content = getContent();
      return marked(content, { sanitize: true });
    },
  },
  created() {
    isInGroup('editor').then(response => this.isEditor = response);
  }

}
</script>
