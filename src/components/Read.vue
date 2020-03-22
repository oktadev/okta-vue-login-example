<template>
  <div class="content">
    <md-button class="md-raised"><router-link to="edit">Edit</router-link></md-button>
    <div v-html="compiledMarkdown"></div>
  </div>
</template>

<script>
import marked from 'marked';
import { getContent } from '../service/content';

export default {
  name: 'Read',
  computed: {
    compiledMarkdown: function() {
      const content = getContent();
      return marked(content, { sanitize: true });
    }
  },
}
</script>
