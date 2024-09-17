import type { SourceType } from '../../types/index'

export const treeIconsMap: { [key in SourceType]: string } = {
  directory: 'mdi:folder',
  file: 'mdi:file',
  image: 'mdi:file-image',
  pdf: 'mdi:file-pdf',
  excel: 'mdi:file-excel',
  word: 'mdi:file-word',
  ppt: 'mdi:file-powerpoint',
  markdown: 'mdi:markdown',
  zip: 'mdi:zip-box',
  xml: 'mdi:file-xml',
  json: 'mdi:json',
  js: 'mdi:language-javascript',
  ts: 'mdi:language-typescript',
  vue: 'mdi:vuejs',
  tsx: 'mdi:react',
  css: 'mdi:language-css3',
  scss: 'mdi:sass',
  sass: 'mdi:sass',
  less: 'mdi:less',
  html: 'mdi:language-html5',
}
