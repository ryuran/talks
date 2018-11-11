import 'dom4';

import Reveal from 'reveal.js';

import './lib/notes.js';
import './lib/breadcrumb';
import './lib/fix-pre-attrs';
import './lib/gsap';
import './lib/linkrolls';

import 'reveal.js/css/reveal.scss';
import '../css/main.scss';

Reveal.initialize({
  slideNumber: true,
  history: true,
  fragmentInURL: true,
  autoPlayMedia: true,
  width: '100%',
  height: '100%',
})

