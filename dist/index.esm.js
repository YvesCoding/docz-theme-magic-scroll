import { __rest } from 'tslib';
import * as React from 'react';
import { useState as useState$1, createElement, useMemo, useCallback, useEffect as useEffect$1, Fragment, forwardRef, useRef } from 'react';
import { useConfig, useDocs, usePrevious, useMenus, useWindowSize, useComponents, ComponentsProvider, theme } from 'docz';
import getter from 'lodash/get';
import { LiveError, LiveProvider, LivePreview } from 'react-live';
import styled, { css, keyframes, createGlobalStyle } from 'styled-components';
import rgba from 'polished/lib/color/rgba';
import Resizable from 're-resizable';
import { a as get, b as ThemeProvider } from './chunk.esm.js';
import Smartphone from 'react-feather/dist/icons/smartphone';
import Tablet from 'react-feather/dist/icons/tablet';
import Monitor from 'react-feather/dist/icons/monitor';
import BaseCheck from 'react-feather/dist/icons/check';
import Clipboard$1 from 'react-feather/dist/icons/clipboard';
import copy from 'copy-text-to-clipboard';
import lighten from 'polished/lib/color/lighten';
import darken from 'polished/lib/color/darken';
import Maximize from 'react-feather/dist/icons/maximize';
import Minimize from 'react-feather/dist/icons/minimize';
import Refresh from 'react-feather/dist/icons/refresh-cw';
import Code from 'react-feather/dist/icons/code';
import loadable from '@loadable/component';
import hotkeys from 'hotkeys-js';
import Hash from 'react-feather/dist/icons/hash';
import facepaint from 'facepaint';
import SearchIcon from 'react-feather/dist/icons/search';
import ChevronDown from 'react-feather/dist/icons/chevron-down';
import { Location } from '@reach/router';
import Scrollbar, { GlobarBarOptionsContext } from 'magic-scroll';
import Edit from 'react-feather/dist/icons/edit-2';

const white = '#FFFFFF';
const grayUltraLight = '#FCFBFA';
const grayExtraLight = '#F5F6F7';
const grayLight = '#CED4DE';
const gray = '#7D899C';
const grayDark = '#2D3747';
const grayExtraDark = '#1D2330';
const dark = '#13161F';
const blueLight = '#e9f2fa';
const blue = '#0B5FFF';
const skyBlue = '#1FB6FF';
const negative = '#EB4D4B';

var colors = /*#__PURE__*/Object.freeze({
  white: white,
  grayUltraLight: grayUltraLight,
  grayExtraLight: grayExtraLight,
  grayLight: grayLight,
  gray: gray,
  grayDark: grayDark,
  grayExtraDark: grayExtraDark,
  dark: dark,
  blueLight: blueLight,
  blue: blue,
  skyBlue: skyBlue,
  negative: negative
});

const light = Object.assign({}, colors, {
  primary: blue,
  text: grayDark,
  link: blue,
  footerText: grayDark,
  sidebarBg: grayExtraLight,
  sidebarText: dark,
  sidebarHighlight: null,
  sidebarBorder: grayLight,
  background: white,
  border: grayLight,
  theadColor: gray,
  theadBg: grayExtraLight,
  tableColor: dark,
  tooltipBg: dark,
  tooltipColor: grayExtraLight,
  codeBg: grayExtraLight,
  codeColor: gray,
  preBg: grayExtraLight,
  blockquoteBg: grayExtraLight,
  blockquoteBorder: grayLight,
  blockquoteColor: gray,
  propsText: gray,
  propsBg: grayUltraLight
});
const dark$1 = Object.assign({}, colors, {
  primary: skyBlue,
  text: grayExtraLight,
  link: skyBlue,
  footerText: grayLight,
  sidebarBg: dark,
  sidebarText: grayLight,
  sidebarHighlight: null,
  sidebarBorder: grayDark,
  background: grayExtraDark,
  border: grayDark,
  theadColor: gray,
  theadBg: grayDark,
  tableColor: grayExtraLight,
  tooltipBg: dark,
  tooltipColor: grayExtraLight,
  codeBg: gray,
  codeColor: grayExtraLight,
  preBg: grayDark,
  blockquoteBg: grayDark,
  blockquoteBorder: gray,
  blockquoteColor: gray,
  propsText: grayLight,
  propsBg: dark
});

var modes = /*#__PURE__*/Object.freeze({
  light: light,
  dark: dark$1
});

class Storage {
  constructor(name) {
    this.name = name;
  }

  get() {
    if (typeof window !== 'undefined') {
      try {
        const item = window.localStorage.getItem(this.name);
        return typeof item === 'string' ? JSON.parse(item) : null;
      } catch (err) {
        return {};
      }
    }
  }

  set(value) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(this.name, JSON.stringify(value));
    }
  }

  delete() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(this.name);
    }
  }

}

const Button = styled.button.withConfig({
  displayName: "Button"
})(["cursor:pointer;display:flex;align-items:center;outline:none;border:none;"]);
const ButtonLink = styled(Button).withConfig({
  displayName: "Button__ButtonLink"
})(["background:transparent;"]);

const ButtonSwap = _a => {
  var {
    as: Button$1 = Button,
    onClick,
    swap,
    children
  } = _a,
      props = __rest(_a, ["as", "onClick", "swap", "children"]);

  const hasSwap = Boolean(swap);
  const [on, setOn] = useState$1(() => false);

  const toggle = () => setOn(s => !s);

  const handleClick = ev => {
    onClick && onClick(ev);
    hasSwap && toggle();
    hasSwap && setTimeout(toggle, 500);
  };

  return createElement(Button$1, Object.assign({
    onClick: handleClick
  }, props), on ? swap : children);
};

const textColor = get('colors.text', '#2D3747');
const ActionButton = styled(ButtonSwap).withConfig({
  displayName: "elements__ActionButton"
})(["padding:4px;background:transparent;font-size:12px;text-transform:uppercase;transition:color 0.3s;&,& a{color:", ";}&:hover,& a:hover{color:", ";}"], p => rgba(textColor(p), 0.4), p => rgba(textColor(p), 0.7));
const Check = styled(BaseCheck).withConfig({
  displayName: "elements__Check"
})(["stroke:", ";"], get('colors.primary'));
const ClipboardAction = _a => {
  var {
    content
  } = _a,
      props = __rest(_a, ["content"]);

  return createElement(ActionButton, Object.assign({}, props, {
    title: "Copy to clipboard",
    onClick: () => copy(content),
    swap: createElement(Check, {
      width: 17
    })
  }), createElement(Clipboard$1, {
    width: 15
  }));
};

const Wrapper = styled.div.withConfig({
  displayName: "ResizeBar__Wrapper"
})(["position:absolute;top:10px;left:50%;margin-bottom:5px;transform:translateX(-50%);"]);
const Buttons = styled.div.withConfig({
  displayName: "ResizeBar__Buttons"
})(["display:flex;background:", ";border:1px solid ", ";border-radius:", ";padding:3px 5px;"], get('colors.background'), get('colors.border'), get('radii'));
const ResizeBar = ({
  onChangeSize
}) => createElement(Wrapper, null, createElement(Buttons, null, createElement(ActionButton, {
  onClick: () => onChangeSize('360px', '640px'),
  title: "Smartphone"
}, createElement(Smartphone, {
  width: 20
})), createElement(ActionButton, {
  onClick: () => onChangeSize('768px', '1024px'),
  title: "Tablet"
}, createElement(Tablet, {
  width: 20
})), createElement(ActionButton, {
  onClick: () => onChangeSize('1366px', '1024px'),
  title: "Monitor"
}, createElement(Monitor, {
  width: 20
}))));

const CodeSandboxLogo = props => createElement("svg", Object.assign({}, props, {
  viewBox: "0 0 512 512"
}), createElement("path", {
  d: "M69.2898098,165.083974 L69.2898098,276.649443 L152.161311,324.692718 L152.161311,412.603224 L241.327633,463.829131 L241.327633,264.06328 L69.2898098,165.083974 Z M89.0172642,137.098529 L260.121958,235.540974 L427.640018,138.456525 L339.210941,87.2017661 L262.258901,131.853758 L179.736828,84.2839889 L89.0172642,137.098529 Z M272.206216,463.739666 L370.845646,406.905256 L370.845646,322.809124 L444.244039,280.276172 L444.244039,167.397587 L272.206216,266.116045 L272.206216,463.739666 Z M255.633239,512 L34,384.729507 L34,128.977638 L255.644267,0 L477.328236,128.432852 L477.328236,384.321468 L255.633239,512 Z",
  fill: "currentColor"
}));

const borderColor = get('colors.border');

const getActionsBg = p => p.theme.docz.mode === 'light' ? lighten(0.13, borderColor(p)) : darken(0.04, borderColor(p));

const Actions = styled.div.withConfig({
  displayName: "ActionsBar__Actions"
})(["display:flex;justify-content:flex-end;padding:0 5px;background:", ";"], getActionsBg);
const actionStyle = css(["padding:3px 10px;border-left:1px solid ", ";"], borderColor);
const Action = styled(ActionButton).withConfig({
  displayName: "ActionsBar__Action"
})(["", ";"], actionStyle);
const Clipboard = styled(ClipboardAction).withConfig({
  displayName: "ActionsBar__Clipboard"
})(["", ";"], actionStyle);
const ActionsBar = ({
  showEditor,
  code,
  fullscreen,
  codesandboxUrl,
  onClickRefresh,
  onClickFullscreen,
  onClickEditor
}) => {
  const config = useConfig();
  const hasSandbox = Boolean(config.codeSandbox);
  return createElement(Actions, {
    withRadius: showEditor
  }, createElement(Action, {
    onClick: onClickRefresh,
    title: "Refresh playground"
  }, createElement(Refresh, {
    width: 15
  })), hasSandbox && createElement(Action, {
    as: "a",
    href: codesandboxUrl,
    target: "_blank",
    title: "Open in CodeSandbox"
  }, createElement(CodeSandboxLogo, {
    style: {
      height: '100%'
    },
    width: 15
  })), createElement(Clipboard, {
    content: code
  }), createElement(Action, {
    onClick: onClickFullscreen,
    title: fullscreen ? 'Minimize' : 'Maximize'
  }, fullscreen ? createElement(Minimize, {
    width: 15
  }) : createElement(Maximize, {
    width: 15
  })), createElement(Action, {
    onClick: onClickEditor,
    title: showEditor ? 'Close editor' : 'Show editor'
  }, createElement(Code, {
    width: 15
  })));
};

const HANDLE_SIZE = '20px';
const borderColor$1 = get('colors.border');
const preBg = get('colors.preBg');
const mode = get('mode');

const getLineBackground = p => mode(p) === 'light' ? darken(0.05, borderColor$1(p)) : lighten(0.06, borderColor$1(p));

const line = position => p => css(["content:'';position:absolute;display:block;top:", ";left:", ";width:", ";height:", ";background:", ";transform:translate(-50%,-50%);"], p.horizontal ? '50%' : position, p.horizontal ? position : '50%', p.horizontal ? '2px' : '25px', p.horizontal ? '25px' : '2px', getLineBackground);

const whenHorizontal = (on, off) => p => p.horizontal ? on : off;

const handleHeight = p => p.horizontal ? `calc(100% ${p.full ? '+ 3px' : '- 2px'})` : HANDLE_SIZE;

const Handle = styled.div.withConfig({
  displayName: "Handle"
})(["z-index:", ";position:absolute;display:block;width:", ";height:", ";border:1px solid ", ";border-radius:", ";background:", ";box-sizing:content-box;", ";&:after{", ";}&:before{", ";}"], p => p.full ? p.horizontal ? 9999 : 9998 : 9, whenHorizontal(HANDLE_SIZE, 'calc(100% + 3px)'), handleHeight, p => lighten(0.03, borderColor$1(p)), whenHorizontal('0 4px 4px 0', '0 0 4px 4px'), p => darken(0.01, preBg(p)), whenHorizontal(`
      top: 0;
      right: 0;
    `, `
      bottom: 0;
      left: 0;
    `), line('calc(50% + 3px)'), line('calc(50% - 3px)'));

const CodeMirror = loadable(() => import('./index.esm2.js'));

const getLanguage = children => {
  const defaultLanguage = 'jsx';
  if (typeof children === 'string') return defaultLanguage;
  const language = getter(children, 'props.props.className') || defaultLanguage;
  const result = language.replace('language-', '');
  if (result === 'js' || result === 'javascript') return 'jsx';

  if (result === 'ts' || result === 'tsx' || result === 'typescript') {
    return 'text/typescript';
  }

  return result;
};

const getChildren = children => children && typeof children !== 'string' ? getter(children, 'props.children') : children;

const Wrapper$1 = styled.div.withConfig({
  displayName: "Editor__Wrapper"
})(["margin:30px 0;position:relative;width:100%;border:1px solid ", ";"], get('colors.border'));
const Actions$1 = styled.div.withConfig({
  displayName: "Editor__Actions"
})(["z-index:999;position:absolute;top:0;right:0;display:flex;flex-direction:column;align-items:center;padding:5px 10px;background:transparent;"]);
const Editor = _a => {
  var {
    mode,
    children,
    actions,
    onChange,
    className,
    editorClassName,
    language: defaultLanguage
  } = _a,
      props = __rest(_a, ["mode", "children", "actions", "onChange", "className", "editorClassName", "language"]);

  const config = useConfig();
  const initialCode = useMemo(() => getChildren(children), [children]);
  const [code, setCode] = useState$1(initialCode);
  const language = defaultLanguage || getLanguage(children);
  const options = Object.assign({}, props, {
    tabSize: 2,
    mode: language || mode,
    lineNumbers: true,
    lineWrapping: true,
    autoCloseTags: true,
    theme: 'docz-light'
  });

  const onEditorDidMount = editor => {
    if (editor) removeLastLine(editor);
  };

  const removeLastLine = useCallback(editor => {
    if (editor && !props.withLastLine && props.readOnly) {
      const lastLine = editor.lastLine();
      editor.doc.replaceRange('', {
        line: lastLine - 1
      }, {
        line: lastLine
      });
    }
  }, [props.withLastLine, props.readOnly]);
  const handleChange = useCallback((editor, data, code) => {
    onChange && onChange(code);
    setCode(code);
  }, [code]);

  const editorProps = config => ({
    value: code,
    className: editorClassName,
    editorDidMount: onEditorDidMount,
    onBeforeChange: handleChange,
    options: Object.assign({}, options, {
      theme: config && config.themeConfig ? config.themeConfig.codemirrorTheme : options.theme
    })
  });

  return createElement(Wrapper$1, {
    className: className
  }, createElement(CodeMirror, Object.assign({}, editorProps(config))), createElement(Actions$1, null, actions || createElement(ClipboardAction, {
    content: code
  })));
};
Editor.defaultProps = {
  mode: 'js',
  readOnly: true,
  matchBrackets: true,
  indentUnit: 2
};

const useHotkeys = (key, cb, inputs) => {
  useEffect$1(() => {
    if (typeof window !== 'undefined') {
      hotkeys(key, cb);
      return () => hotkeys.unbind(key);
    }

    return;
  }, inputs);
};

const whenFullscreen = (on, off) => p => p.full ? on : off;

const Overlay = styled.div.withConfig({
  displayName: "Playground__Overlay"
})(["top:0;left:0;z-index:", ";position:", ";width:", ";height:", ";padding:", ";margin:", ";background:", ";box-sizing:border-box;transition:background 0.3s;"], whenFullscreen(9999, 0), whenFullscreen('fixed', 'relative'), whenFullscreen('100vw', 'auto'), whenFullscreen('100vh', 'auto'), whenFullscreen('60px 20px 20px', '0px'), whenFullscreen('0px', '0 0 30px'), whenFullscreen('rgba(0,0,0,0.5)', 'transparent'));
const borderColor$2 = get('colors.border');
const minusHandleSize = `calc(100% - ${HANDLE_SIZE} + 4px)`;
const Wrapper$2 = styled.div.withConfig({
  displayName: "Playground__Wrapper"
})(["display:flex;flex-direction:column;height:", ";width:", ";border:1px solid ", ";"], whenFullscreen(minusHandleSize, '100%'), minusHandleSize, borderColor$2);
const backgroundColor = get('colors.background');
const PreviewWrapper = styled.div.withConfig({
  displayName: "Playground__PreviewWrapper"
})(["position:relative;flex:1;border-bottom:1px solid ", ";background:", ";min-height:", ";"], borderColor$2, backgroundColor, whenFullscreen('198px', 'auto'));
const StyledPreviewWrapper = styled.div.withConfig({
  displayName: "Playground__StyledPreviewWrapper"
})(["position:relative;box-sizing:border-box;width:100%;", ";"], get('styles.playground'));
const StyledError = styled(LiveError).withConfig({
  displayName: "Playground__StyledError"
})(["position:absolute;top:0;left:0;width:calc(100% - 40px);height:calc(100% - 40px);padding:20px;margin:0;background:", ";font-size:16px;color:white;"], rgba('black', 0.8));
const Pre = styled(Editor).withConfig({
  displayName: "Playground__Pre"
})(["box-sizing:content-box;width:calc(100% - 2px);border-radius:0 !important;border-bottom:0;border-left:0;margin:0;"]);
const editorStyle = css(["border-top:0;"]);

const fromStorage = storage => (key, defaultValue) => {
  const obj = storage.get();
  return obj ? getter(obj, key) : defaultValue;
};

const Playground = ({
  position,
  code: initialCode,
  codesandbox,
  className,
  style,
  scope,
  wrapper: CustomWrapper = Fragment
}) => {
  const {
    themeConfig,
    native
  } = useConfig();
  const initialShowEditor = getter(themeConfig, 'showPlaygroundEditor');
  const storage = useMemo(() => new Storage(`doczPlayground-${position}`), []);
  const atPos = fromStorage(storage);
  const initialFullscreen = atPos('fullscreen', false);
  const initialWidth = atPos('width', '100%');
  const initialHeight = atPos('height', '100%');
  const [key, setKey] = useState$1(0);
  const [code, setCode] = useState$1(initialCode);
  const [fullscreen, setFullscreen] = useState$1(() => initialFullscreen);
  const [width, setWidth] = useState$1(() => initialWidth);
  const [height, setHeight] = useState$1(() => initialHeight);
  const [showEditor, setShowEditor] = useState$1(() => Boolean(initialShowEditor));
  const state = {
    fullscreen,
    width,
    height,
    code,
    key,
    showEditor
  };
  const resizableProps = useMemo(() => ({
    minHeight: fullscreen ? 360 : '100%',
    minWidth: 260,
    maxWidth: '100%',
    maxHeight: '100%',
    size: {
      width,
      height
    },
    style: {
      margin: '0 auto '
    },
    enable: {
      top: false,
      right: true,
      bottom: fullscreen,
      left: false,
      topRight: false,
      bottomRight: fullscreen,
      bottomLeft: false,
      topLeft: false
    },
    handleComponent: {
      // eslint-disable-next-line
      right: () => createElement(Handle, {
        full: fullscreen,
        horizontal: true
      }),
      // eslint-disable-next-line
      bottom: () => createElement(Handle, {
        full: fullscreen,
        horizontal: false
      })
    },
    onResizeStop: (e, direction, ref, d) => {
      const width = ref.style.width;
      const height = ref.style.height;
      handleSetSize(width, height);
    }
  }), [fullscreen, width, height]);
  const editorProps = {
    css: editorStyle,
    actions: createElement(Fragment, null)
  };
  const setStorageProp = useCallback(fullscreen => {
    storage.set(Object.assign({}, state, {
      fullscreen
    }));
  }, []);

  const handleToggleFullscreen = () => {
    if (fullscreen) storage.delete();else setStorageProp(true);
    setFullscreen(atPos('fullscreen', false));
    setWidth(atPos('width', '100%'));
    setHeight(atPos('width', '100%'));
  };

  const handleToggleShowEditor = useCallback(() => {
    setShowEditor(s => !s);
  }, []);
  const handleSetSize = useCallback((width, height) => {
    const current = atPos('fullscreen', false);
    setWidth(width);
    setHeight(height);
    setStorageProp(current);
  }, []);
  const handleRefresh = useCallback(() => {
    setKey(key + 1);
  }, []);
  const transformCode = useCallback(code => {
    if (code.startsWith('()') || code.startsWith('class')) return code;
    return `<React.Fragment>${code}</React.Fragment>`;
  }, [code]);
  const codesandboxUrl = useCallback(native => {
    const url = 'https://codesandbox.io/api/v1/sandboxes/define';
    return `${url}?parameters=${codesandbox}${native ? `&editorsize=75` : ``}`;
  }, [codesandbox, native]);
  const unloadListener = useCallback(() => {
    storage.delete();
  }, []);
  const addUnloadListener = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', unloadListener, false);
    }
  }, []);
  const removeUnloadListener = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('beforeunload', unloadListener, false);
    }
  }, []);
  useEffect$1(() => {
    addUnloadListener();
    return () => removeUnloadListener();
  }, []);
  useEffect$1(() => {
    if (typeof window !== 'undefined') {
      const method = fullscreen ? 'add' : 'remove';
      document.body.classList[method]('with-overlay');
    }
  }, [fullscreen]);
  useHotkeys('esc', () => {
    fullscreen && handleToggleFullscreen();
  });
  return createElement(LiveProvider, {
    code: code,
    scope: scope,
    transformCode: transformCode
  }, createElement(Overlay, {
    full: fullscreen
  }, fullscreen ? createElement(ResizeBar, {
    onChangeSize: handleSetSize
  }) : null, createElement(Resizable, Object.assign({}, resizableProps), createElement(Wrapper$2, {
    full: fullscreen
  }, createElement(PreviewWrapper, {
    full: fullscreen
  }, createElement(StyledPreviewWrapper, null, createElement(CustomWrapper, null, createElement(LivePreview, {
    className: className,
    style: style
  }))), createElement(StyledError, null)), createElement(ActionsBar, Object.assign({}, {
    fullscreen,
    showEditor,
    code
  }, {
    codesandboxUrl: codesandboxUrl(native),
    onClickRefresh: handleRefresh,
    onClickEditor: handleToggleShowEditor,
    onClickFullscreen: handleToggleFullscreen
  })), showEditor && createElement(Pre, Object.assign({}, editorProps, {
    onChange: setCode,
    readOnly: false
  }), code)))));
};

const Blockquote = styled.blockquote.withConfig({
  displayName: "Blockquote"
})(["background:", ";border-left:5px solid ", ";color:", ";", ";& > p{margin:0;color:", ";}"], get('colors.blockquoteBg'), get('colors.blockquoteBorder'), get('colors.blockquoteColor'), get('styles.blockquote'), get('colors.blockquoteColor'));

const H1 = styled.h1.withConfig({
  displayName: "H1"
})(["", ";"], get('styles.h1'));

const Icon = styled(Hash).withConfig({
  displayName: "H2__Icon"
})(["position:absolute;display:inline-block;top:11px;left:-28px;opacity:0;transition:opacity 0.2s;color:", ";"], get('colors.primary'));
const Heading = styled.h2.withConfig({
  displayName: "H2__Heading"
})(["position:relative;&:hover .heading--Icon{opacity:1;}", ";"], get('styles.h2'));
const H2 = _a => {
  var {
    children
  } = _a,
      props = __rest(_a, ["children"]);

  const pathname = typeof window !== 'undefined' ? location.pathname : '/';
  const {
    linkComponent: Link
  } = useConfig();
  if (!Link) return null;
  return createElement(Heading, Object.assign({}, props), createElement(Link, {
    "aria-hidden": true,
    to: `${pathname}#${props.id}`
  }, createElement(Icon, {
    className: "heading--Icon",
    height: 20
  })), children);
};

const H3 = styled.h3.withConfig({
  displayName: "H3"
})(["", ";"], get('styles.h3'));

const H4 = styled.h4.withConfig({
  displayName: "H4"
})(["", ";"], get('styles.h4'));

const H5 = styled.h5.withConfig({
  displayName: "H5"
})(["", ";"], get('styles.h5'));

const H6 = styled.h6.withConfig({
  displayName: "H6"
})(["", ";"], get('styles.h6'));

const Hr = styled.hr.withConfig({
  displayName: "Hr"
})(["border:none;border-top:1px dashed ", ";margin:40px 0;", ";"], get('colors.border'), get('styles.hr'));

const InlineCode = styled.code.withConfig({
  displayName: "InlineCode"
})(["background:", ";color:", ";", ";"], get('colors.codeBg'), get('colors.codeColor'), get('styles.code'));

const LinkStyled = styled.a.withConfig({
  displayName: "Link__LinkStyled"
})(["&,&:visited,&:active{text-decoration:none;color:", ";}&:hover{color:", ";}", ";"], get('colors.link'), get('colors.link'), get('styles.link'));

const getSeparator = (separator, href) => {
  if (typeof window === 'undefined') return null;
  return [location.pathname.split(separator).slice(0, -1).join(separator).slice(1), (href || '').replace(/^(?:\.\/)+/gi, '')].join('/');
};

const Link = _a => {
  var {
    href
  } = _a,
      props = __rest(_a, ["href"]);

  const {
    separator,
    linkComponent: Link
  } = useConfig();
  const docs = useDocs();
  const toCheck = useMemo(() => getSeparator(separator, href), [separator, href]);
  const matched = docs && docs.find(doc => doc.filepath === toCheck);
  const nHref = matched ? matched.route : href;
  const isInternal = nHref && nHref.startsWith('/');
  return isInternal ? createElement(LinkStyled, Object.assign({
    as: Link
  }, props, {
    to: nHref
  })) : createElement(LinkStyled, Object.assign({}, props, {
    href: nHref
  }));
};

const Wrapper$3 = styled.div.withConfig({
  displayName: "Loading__Wrapper"
})(["display:flex;align-items:center;justify-content:center;width:100%;height:100vh;"]);
const dash = keyframes`
  to {
    stroke-dashoffset: 1000;
  }
`;

const spinnerClass = (delay = 0) => css`
  stroke-dasharray: 100;
  animation: ${dash} 5s ${delay}s cubic-bezier(0.455, 0.03, 0.515, 0.955)
    infinite;
`;

const Lines = styled.path.withConfig({
  displayName: "Loading__Lines"
})(["stroke:", ";stroke-width:3px;"], get('colors.primary'));
const Path = styled.path.withConfig({
  displayName: "Loading__Path"
})(["fill:", ";"], get('colors.primary'));

const Spinner = ({
  size = 60
}) => createElement("svg", {
  width: size,
  height: size * 0.79,
  viewBox: "0 0 121 96"
}, createElement("g", null, createElement(Path, {
  d: "M94.4110629,60.8520717 C95.3815188,60.8520717 96.1684193,61.6483184 96.1684193,62.6308855 L96.1684193,84.1888093 C96.1684193,90.7014865 90.9354492,96 84.2817971,96 L11.6626593,96 C5.08322545,96 0.0693980867,90.6732777 9.65270039e-05,83.6092251 C-0.0048201377,83.1344165 0.178267091,82.6773865 0.508386007,82.3398291 C0.838270796,82.0025088 1.28802855,81.8126327 1.75698472,81.8126327 L20.0341004,81.8126327 L20.0341004,11.8111907 C20.0341004,5.29851351 25.2670706,0 31.6994728,0 L104.318611,0 C110.916775,0 115.930602,5.32672231 115.999903,12.3907749 C116.00482,12.8655835 115.821733,13.3226135 115.491614,13.6601709 C115.161729,13.9974912 114.711971,14.1873673 114.243015,14.1873673 L96.1677169,14.1873673 L96.1677169,27.6014816 C96.1677169,28.5840486 95.3810506,29.3805324 94.4105946,29.3805324 C93.4401387,29.3805324 92.6534723,28.5842856 92.6534723,27.6014816 L92.6534723,12.4083165 L92.6534723,11.8111907 C92.6534723,11.6092251 92.6586231,11.4084449 92.6841429,10.9981135 C92.6928056,10.8698701 92.7005318,10.7413897 92.7436112,10.3687491 C92.7574246,10.2552027 92.7695992,10.1411823 92.831877,9.76735641 C92.8501389,9.66186972 92.8667619,9.55614598 92.9475357,9.18611289 C92.970246,9.08560423 92.9913174,8.98462146 93.0908213,8.61601067 C93.1175118,8.52000593 93.1425634,8.42352709 93.1715951,8.32870759 C93.1992221,8.23862907 93.230361,8.15044694 93.3528093,7.78396958 C93.3848847,7.69483925 93.4202379,7.60736827 93.5590751,7.25132105 C93.5953648,7.16385007 93.6349322,7.07803842 93.7896901,6.73147316 C93.8299599,6.64613561 93.8735075,6.56245741 94.0439519,6.22513704 C94.0882019,6.14193293 94.1354955,6.06062522 94.3213923,5.7327868 C94.3693883,5.65219023 94.4199597,5.57349005 94.6208406,5.25560768 C94.6723485,5.17809275 94.7261977,5.10223715 94.9425309,4.79383673 C94.9970825,4.71940343 95.0537412,4.64710356 95.2848244,4.34889624 C95.3424196,4.27754457 95.402122,4.20832634 95.647487,3.92078621 C95.7074235,3.85346437 95.7694671,3.78803892 95.9815861,3.55810163 L31.7001752,3.55810163 C27.2058754,3.55810163 23.5492816,7.26009186 23.5492816,11.8109536 L23.5492816,81.8126327 L74.3763566,81.8126327 C75.3400229,81.8126327 76.1238797,82.5984493 76.1334789,83.5741419 C76.1831138,88.6294434 79.6861203,92.4418984 84.503047,92.4418984 C88.9973468,92.4418984 92.6539406,88.7399081 92.6539406,84.1890464 L92.6539406,62.6311225 C92.6539406,61.6485555 93.4406069,60.8520717 94.4110629,60.8520717 Z M96.2578558,10.5918119 C96.2562169,10.6041385 96.2550463,10.6167021 96.2543439,10.6287915 L112.318258,10.6287915 C111.563199,6.49371327 108.371815,3.55786459 104.339214,3.55786459 C104.270849,3.55786459 104.203186,3.56094622 104.135289,3.56260556 C104.072075,3.5642649 104.008861,3.564739 103.946115,3.56758358 C103.83748,3.57279866 103.729781,3.58085831 103.622317,3.59034026 C103.604289,3.59176256 103.586262,3.59271075 103.568468,3.59437009 C103.45117,3.60551138 103.334575,3.61926021 103.218682,3.63537952 C103.211424,3.63632772 103.204167,3.63727591 103.196909,3.63822411 C103.075397,3.65529162 102.954587,3.67520371 102.834948,3.69772334 C102.834246,3.69796039 102.83331,3.69796039 102.832607,3.69819744 C101.371187,3.97364808 100.046965,4.64283668 98.9709182,5.5917428 C98.9681087,5.59435034 98.965065,5.59672083 98.9622555,5.59932836 C98.8779698,5.67376167 98.7955572,5.75009136 98.7145493,5.82784335 C98.7058866,5.83637711 98.6972239,5.84467381 98.6885612,5.85297052 C98.6117675,5.92740382 98.5363787,6.00349647 98.4623946,6.08077436 C98.4504541,6.09310089 98.4389819,6.10566448 98.4272756,6.11799101 C98.3558669,6.19360956 98.2858629,6.27017631 98.2174979,6.34840239 C98.204855,6.36286236 98.1924463,6.37755939 98.1800376,6.39201936 C98.1128431,6.4700084 98.0463511,6.54894563 97.9819662,6.6295422 C97.9714305,6.64281693 97.961363,6.65632871 97.9508273,6.66960344 C97.8850377,6.75304459 97.8201845,6.8371969 97.7574385,6.92300854 C97.7555655,6.92561608 97.7539266,6.92798657 97.7520536,6.9305941 C97.55726,7.19822213 97.3790895,7.47888785 97.2168395,7.76974665 C97.2025578,7.79558497 97.1871054,7.82071213 97.1730578,7.8467875 C97.136534,7.91387229 97.1023515,7.98214233 97.0677007,8.05041237 C97.044288,8.09639982 97.0201729,8.14191318 96.9976968,8.18837473 C96.9674944,8.25071855 96.9389309,8.31448467 96.9101333,8.37777668 C96.8857841,8.4313497 96.8612008,8.48492271 96.8380222,8.53920687 C96.8118,8.6001284 96.7872167,8.66152403 96.7626334,8.7231567 C96.7392207,8.78170774 96.7160421,8.84002173 96.6940342,8.89904687 C96.671558,8.95878315 96.6502525,9.01923058 96.629181,9.07967801 C96.6074072,9.14225888 96.5863358,9.20483975 96.5662009,9.26789471 C96.5472366,9.32691985 96.5287406,9.38618203 96.5111811,9.44591832 C96.4917485,9.51181787 96.4732525,9.57842856 96.4552248,9.64503926 C96.4395383,9.70335325 96.4240859,9.76190429 96.40957,9.82069238 C96.3924787,9.89062176 96.3767922,9.96102524 96.3613399,10.0316658 C96.3489311,10.0885575 96.3362883,10.1454492 96.3250502,10.202815 C96.3103002,10.2781965 96.2974232,10.3540521 96.2847804,10.4299076 C96.2756494,10.4837177 96.2658161,10.5375278 96.2578558,10.5918119 Z M11.6624252,92.4418984 L75.9979194,92.4418984 C75.9649075,92.4068152 75.9335345,92.3698355 75.9009909,92.3342782 C75.8553361,92.284498 75.8099155,92.2344807 75.7651973,92.1837523 C75.6987052,92.1083708 75.6331497,92.0320411 75.5685307,91.9547632 C75.5252172,91.9030866 75.4819037,91.8514099 75.4392927,91.7990222 C75.3746736,91.7193738 75.3114594,91.637829 75.2487134,91.5560472 C75.2089118,91.5041335 75.1688761,91.452931 75.1297769,91.4003062 C75.0646896,91.3128352 75.0019436,91.2234678 74.9391976,91.1338634 C74.9050151,91.0847943 74.8698961,91.0366734 74.8361818,90.9871302 C74.7633683,90.8797471 74.6928961,90.7702306 74.6233604,90.660003 C74.602289,90.6265791 74.580047,90.5943405 74.5592097,90.5606795 C74.4700073,90.4165539 74.3836145,90.2700578 74.3000312,90.1211912 C74.2777891,90.081604 74.2569519,90.0408316 74.2351781,90.0007704 C74.1750074,89.8907798 74.1153051,89.7805521 74.0581781,89.6684281 C74.0282099,89.60964 74.0003488,89.5499037 73.971317,89.4906415 C73.9247258,89.3951109 73.8779004,89.2993432 73.8334163,89.2021532 C73.8032139,89.1362536 73.7744163,89.0694059 73.7453846,89.0027952 C73.7048806,88.9098721 73.6646108,88.816949 73.6259799,88.7228406 C73.5974164,88.6529113 73.5700236,88.5822707 73.5423966,88.5116302 C73.5061069,88.4187071 73.4707538,88.3253099 73.4365712,88.2309645 C73.4101149,88.1584276 73.3845951,88.0854166 73.3595435,88.0121685 C73.3269998,87.917112 73.2953927,87.8213443 73.2649562,87.7251025 C73.2415435,87.6516174 73.218365,87.5778952 73.196357,87.5036989 C73.1668571,87.4048496 73.1392301,87.3050521 73.1118372,87.2050175 C73.0919364,87.1320065 73.0715674,87.0589955 73.0528373,86.9852733 C73.0259127,86.8802608 73.0013293,86.7738259 72.9769801,86.667391 C72.9610595,86.5972246 72.9439683,86.5275322 72.9289841,86.4566546 C72.9036984,86.3386044 72.8814564,86.2188948 72.8592143,86.0991851 C72.8479762,86.0387377 72.8353334,85.9792385 72.8250318,85.918554 C72.7938929,85.7374488 72.7657977,85.5551583 72.7416826,85.3709714 L21.7919251,85.3709714 L3.68338077,85.3709714 C4.43844,89.5060497 7.62982365,92.4418984 11.6624252,92.4418984 Z M120.998408,32.7899677 C120.998647,32.8098599 121.000556,32.8297522 120.99984,32.850118 C120.998408,32.9064794 120.993634,32.9621303 120.986951,33.0170708 C120.986712,33.0203861 120.986712,33.0234647 120.986235,33.0267801 C120.975971,33.1077699 120.958785,33.1863916 120.938019,33.2635925 C120.933962,33.2787485 120.929665,33.2934308 120.92513,33.30835 C120.878347,33.4655934 120.810559,33.6131276 120.72463,33.7488211 C120.716514,33.7616089 120.708399,33.77416 120.700045,33.7867111 C120.654455,33.854913 120.605285,33.9202732 120.551102,33.981134 C120.54776,33.9846862 120.54418,33.9880016 120.540838,33.9917906 C120.485939,34.0526514 120.426267,34.1087759 120.363491,34.1615851 C120.358478,34.1658477 120.354659,34.1708208 120.349647,34.1748466 C116.038893,37.7064298 112.307441,41.2448806 107.873046,46.0062306 C102.802778,51.4498371 91.7857706,58.7815489 86.0428726,60.5339606 C83.3864839,61.3445694 81.1912456,61.9366004 79.2545094,62.4594822 C75.5209096,63.4666453 72.7568714,64.2130779 69.3242606,65.8091935 L66.5163033,75.703689 C66.2938436,76.487538 65.5749072,77 64.7927178,77 C64.632079,77 64.4685759,76.9786869 64.3062662,76.9332189 C63.354129,76.6670418 62.7994119,75.6852176 63.0674615,74.7405729 L66.0950142,64.0724114 C66.1009815,64.0513351 66.1074262,64.0304956 66.1141095,64.0098929 C66.2733162,63.5189808 66.4310907,63.0273583 66.589104,62.5354989 C68.5186795,56.5263844 70.5141337,50.3124272 74.8387316,45.4144364 C84.7202875,34.2226827 104.265713,30.6427897 119.255011,31.0276098 C119.339269,31.0297412 119.421379,31.0396873 119.502295,31.0529488 C119.520435,31.0557905 119.538337,31.0588691 119.556239,31.0624213 C119.637155,31.0782877 119.716639,31.0979431 119.793259,31.1239925 C119.793736,31.1239925 119.794214,31.1242293 119.794691,31.1244661 C119.871788,31.1507523 119.945305,31.1836692 120.017151,31.2196647 C120.030995,31.2265323 120.0446,31.233163 120.058205,31.2405042 C120.128619,31.2783942 120.196885,31.3198363 120.261331,31.3662516 C120.269208,31.3719351 120.276369,31.378329 120.284007,31.3840125 C120.341293,31.4268755 120.395714,31.473054 120.447271,31.5223109 C120.459445,31.5339147 120.472095,31.5450449 120.48403,31.5571224 C120.53869,31.6120628 120.58977,31.6703187 120.636792,31.7318899 C120.646101,31.7442042 120.654694,31.7572288 120.663764,31.7697799 C120.706489,31.8287462 120.745635,31.8900806 120.780961,31.9540199 C120.785735,31.9630188 120.791225,31.9713072 120.795998,31.9803061 C120.834189,32.0527707 120.866651,32.1285507 120.894816,32.2064619 C120.896965,32.2126191 120.900545,32.2183026 120.902693,32.2244597 C120.905319,32.2318009 120.906274,32.2396157 120.90866,32.2471937 C120.959502,32.3997009 120.989815,32.5607333 120.996976,32.7279228 C120.997692,32.7487623 120.998169,32.769365 120.998408,32.7899677 Z M77.5340269,47.756511 C75.2953469,50.2920613 73.752689,53.2567157 72.4766485,56.4636291 C76.7888345,52.5955355 82.6281636,48.2464759 88.0376107,44.6611362 C91.3895441,42.4395991 97.3876024,38.6593629 103.660632,35.6411889 C101.191855,36.0456645 98.7963549,36.5581265 96.5295094,37.1757332 C88.0946578,39.4737607 81.7037145,43.0337614 77.5340269,47.756511 Z M105.24172,43.5935859 C108.084287,40.541311 110.64878,37.9761591 113.255998,35.5938264 C107.252689,37.4175187 99.0698944,41.6242541 90.0278137,47.6172653 C84.8055001,51.0785153 79.7992015,54.8284396 75.9309802,58.1760196 C74.9697728,59.0079415 74.1544054,59.7489275 73.4588607,60.4098709 C75.0136919,59.9201429 76.5859475,59.4953014 78.3143067,59.0290178 C80.2245483,58.513714 82.3894729,57.9292611 84.9897693,57.1359395 C89.6492502,55.7143547 100.307028,48.8917896 105.24172,43.5935859 Z",
  id: "Combined-Shape",
  fill: "#1F2D3D"
}), createElement(Lines, {
  d: "M31.5,18.5 L38.5,18.5",
  id: "Line",
  strokeWidth: "5",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  css: spinnerClass(1.5)
}), createElement(Lines, {
  d: "M47.75,18.5 L86.25,18.5",
  id: "Line",
  strokeWidth: "5",
  "stroke-linecap": "round",
  strokeLinejoin: "round",
  css: spinnerClass(0.2)
}), createElement(Lines, {
  d: "M30.9375,38.5 L72.0625,38.5",
  id: "Line",
  strokeWidth: "5",
  "stroke-linecap": "round",
  strokeLinejoin: "round",
  css: spinnerClass(1)
}), createElement(Lines, {
  d: "M31,56.5 L59,56.5",
  id: "Line",
  strokeWidth: "5",
  "stroke-linecap": "round",
  strokeLinejoin: "round",
  css: spinnerClass(3)
}), createElement(Lines, {
  d: "M31.375,72.5 L50.625,72.5",
  id: "Line",
  strokeWidth: "5",
  "stroke-linecap": "round",
  strokeLinejoin: "round",
  css: spinnerClass(2)
})));

const Loading = () => createElement(Wrapper$3, null, createElement(Spinner, null));

const octocatWave = keyframes(["0%,100%{transform:rotate(0);}20%,60%{transform:rotate(-25deg);}40%,80%{transform:rotate(10deg);}"]);
const Link$1 = styled.a.withConfig({
  displayName: "GithubLink__Link"
})(["&:hover .octo-arm{animation:", " 560ms ease-in-out;}& .octo-arm{transform-origin:130px 106px;}@media screen and (max-width:500px){&:hover .octo-arm{animation:none;}& .octo-arm{animation:", " 560ms ease-in-out;}}"], octocatWave, octocatWave);
const Svg = styled.svg.withConfig({
  displayName: "GithubLink__Svg"
})(["z-index:99;fill:", ";color:", ";position:absolute;top:0;border:0;right:0;"], get('colors.primary'), get('colors.background'));
const GithubLink = ({
  repository
}) => createElement(Link$1, {
  href: repository,
  target: "_blank",
  "aria-label": "View source on Github"
}, createElement(Svg, {
  width: "80",
  height: "80",
  viewBox: "0 0 250 250",
  "aria-hidden": "true"
}, createElement("path", {
  d: "M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"
}), createElement("path", {
  className: "octo-arm",
  fill: "currentColor",
  d: "M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
}), createElement("path", {
  className: "octo-body",
  fill: "currentColor",
  d: "M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
})));

const breakpoints = {
  mobile: 420,
  tablet: 920,
  desktop: 1120
};
const mq = facepaint([`@media(min-width: ${breakpoints.mobile}px)`, `@media(min-width: ${breakpoints.tablet}px)`, `@media(min-width: ${breakpoints.desktop}px)`]);

const sidebarPrimary = get('colors.sidebarPrimary');
const primaryColor = get('colors.primary');
const Wrapper$4 = styled.div.withConfig({
  displayName: "Logo__Wrapper"
})(["position:relative;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;padding:24px;a,a:hover,a:visited{text-decoration:none;}&:before{position:absolute;content:'';top:0;left:0;width:100%;height:3px;background:", ";}@media screen and (max-width:", "px){&:before{height:", ";}}", ";"], p => sidebarPrimary(p) || primaryColor(p), breakpoints.desktop, p => p.showBg ? '3px' : 0, get('styles.logo'));
const LogoImg = styled('img').withConfig({
  displayName: "Logo__LogoImg"
})(["padding:0;margin:5px 0;"]);
const LogoText = styled('h1').withConfig({
  displayName: "Logo__LogoText"
})(["margin:5px 0;font-size:24px;font-weight:600;letter-spacing:-0.015em;color:", ";"], get('colors.sidebarText'));
const Logo = ({
  showBg
}) => {
  const {
    base,
    title,
    linkComponent: Link,
    themeConfig: {
      logo
    }
  } = useConfig();
  if (!Link) return null;
  return createElement(Wrapper$4, {
    showBg: showBg
  }, createElement(Link, {
    to: typeof base === 'string' ? base : '/'
  }, logo ? createElement(LogoImg, {
    src: logo.src,
    width: logo.width,
    alt: title
  }) : createElement(LogoText, null, title)));
};

const sidebarBorder = get('colors.sidebarBorder', '#CED4DE');
const sidebarText = get('colors.sidebarText', '#13161F');
const Wrapper$5 = styled.div.withConfig({
  displayName: "Search__Wrapper"
})(["display:flex;align-items:center;padding:5px 24px;margin-bottom:20px;border-top:1px dotted ", ";border-bottom:1px dotted ", ";opacity:1;"], sidebarBorder, sidebarBorder);
const Icon$1 = styled(SearchIcon).withConfig({
  displayName: "Search__Icon"
})(["stroke:", ";min-width:20px;opacity:0.5;"], sidebarText);
const Input = styled.input.withConfig({
  displayName: "Search__Input"
})(["outline:none;width:100%;padding:10px;background:transparent;border:none;font-size:16px;color:", ";"], sidebarText);
const Search = ({
  onSearch
}) => createElement(Wrapper$5, null, createElement(Icon$1, null), createElement(Input, {
  type: "text",
  placeholder: "Search here...",
  onChange: ev => {
    onSearch && onSearch(ev.target.value);
  }
}));

const sidebarPrimary$1 = get('colors.sidebarPrimary');
const primaryColor$1 = get('colors.primary');
const Link$2 = styled.a.withConfig({
  displayName: "SmallLink__Link"
})(["position:relative;font-size:14px;padding:0 0 5px 16px;text-decoration:none;opacity:0.5;transition:opacity 0.2s;&,&:visited,&.active{color:", ";}&.active{opacity:1;}&:before{z-index:1;position:absolute;display:block;content:'';top:1px;left:0;width:0;height:20px;background:", ";transition:width 0.2s;}&.active:before{width:2px;}"], get('colors.sidebarText'), p => sidebarPrimary$1(p) || primaryColor$1(p));
const SmallLink = _a => {
  var {
    as: Component,
    slug,
    location
  } = _a,
      props = __rest(_a, ["as", "slug", "location"]);

  const [isActive, setActive] = useState$1(false);
  useEffect$1(() => {
    const decodedHash = decodeURI(location.hash);
    const currentHash = decodedHash && decodedHash.slice(1, Infinity);
    setActive(Boolean(slug === currentHash));
  }, [location]);
  return createElement(Link$2, Object.assign({
    as: Component
  }, props, {
    className: isActive ? 'active' : ''
  }));
};

const Submenu = styled.div.withConfig({
  displayName: "MenuHeadings__Submenu"
})(["display:flex;flex-direction:column;margin:5px 0 0 24px;"]);

const getHeadings = (route, docs) => {
  const doc = docs.find(doc => doc.route === route);
  const headings = getter(doc, 'headings');
  return headings ? headings.filter(heading => heading.depth === 2) : [];
};

const MenuHeadings = ({
  route,
  onClick
}) => {
  const docs = useDocs();
  const {
    linkComponent: Link
  } = useConfig();
  const headings = docs && getHeadings(route, docs);
  return headings && headings.length > 0 ? createElement(Location, null, ({
    location
  }) => createElement(Submenu, null, headings.map(heading => createElement(SmallLink, {
    as: Link,
    location: location,
    key: heading.slug,
    onClick: onClick,
    to: `${route}#${heading.slug}`,
    slug: heading.slug
  }, heading.value)))) : null;
};

const activeWrapper = css(["padding-left:0;&:after{width:1px;}"]);
const Wrapper$6 = styled.div.withConfig({
  displayName: "MenuLink__Wrapper"
})(["position:relative;transition:padding 0.2s;&:after{position:absolute;display:block;content:'';top:30px;left:24px;width:0;height:calc(100% - 36px);border-left:1px dashed ", ";transition:width 0.2s;}", ";"], get('colors.sidebarBorder'), p => p.active && activeWrapper);
const createLink = Link => styled(Link).withConfig({
  displayName: "MenuLink__createLink"
})(["position:relative;display:block;padding:4px 24px;font-weight:600;font-size:18px;letter-spacing:-0.02em;color:", ";text-decoration:none;transition:color 0.2s;&:hover,&:visited{color:", ";}&:hover,&.active{color:", ";font-weight:600;}"], get('colors.sidebarText'), get('colors.sidebarText'), p => get('colors.sidebarPrimary')(p) || get('colors.primary')(p));
const LinkAnchor = createLink(styled.a.withConfig({
  displayName: "MenuLink__LinkAnchor"
})([""]));

const getActiveByLocation = route => {
  if (typeof window === 'undefined') return;
  return location.pathname.slice(0, location.pathname.length - 1) === route;
};

const getActiveFromClass = (el, route) => {
  const activeByClass = el && el.classList.contains('active');
  const activeByLocation = route && getActiveByLocation(route);
  return Boolean(activeByClass || activeByLocation);
};

const checkActiveClass = ($el, isActive) => {
  if (!isActive) return;

  if (isActive && !$el.classList.contains('active')) {
    $el.classList.add('active');
  }
};

const MenuLink = forwardRef(({
  item,
  children,
  onClick,
  onActiveChange
}, ref) => {
  const {
    linkComponent
  } = useConfig();
  const [active, setActive] = useState$1(false);
  const prevActive = usePrevious(active);
  const $el = useRef(ref);
  const Link = useMemo(() => createLink(linkComponent), [linkComponent]);
  const linkProps = {
    children,
    onClick
  };
  useEffect$1(() => {
    const isActive = getActiveFromClass($el.current, item.route);

    if (prevActive !== isActive) {
      setActive(isActive);
      $el && checkActiveClass($el.current, isActive);
      onActiveChange && onActiveChange(isActive);
    }
  });
  return createElement(Wrapper$6, {
    active: active
  }, item.route ? createElement(Link, Object.assign({}, linkProps, {
    to: item.route,
    innerRef: $el,
    activeClassName: "active",
    partiallyActive: true
  })) : createElement(LinkAnchor, Object.assign({}, linkProps, {
    ref: $el,
    href: item.href || '#',
    target: item.href ? '_blank' : '_self'
  }, !item.href && {
    onClick: ev => {
      ev.preventDefault();
      linkProps.onClick && linkProps.onClick(ev);
    }
  })), active && item.route && createElement(MenuHeadings, {
    route: item.route
  }));
});
MenuLink.displayName = 'MenuLink';

const Wrapper$7 = styled.div.withConfig({
  displayName: "Menu__Wrapper"
})(["display:flex;flex-direction:column;"]);
const List = styled.dl.withConfig({
  displayName: "Menu__List"
})(["flex:1;overflow-y:auto;visibility:", ";max-height:", ";"], p => p.opened ? 'visible' : 'hidden', p => p.opened ? 'auto' : '0px');

const iconRotate = p => p.opened ? '-180deg' : '0deg';

const Icon$2 = styled.div.withConfig({
  displayName: "Menu__Icon"
})(["position:absolute;top:50%;right:20px;transform:translateY(-50%) rotate(", ");transform-origin:50% 50%;transition:transform 0.3s;& svg{stroke:", ";}"], iconRotate, get('colors.sidebarText'));
const Menu = props => {
  const [opened, setOpened] = useState$1(false);

  const toggle = () => setOpened(s => !s);

  const {
    item,
    sidebarToggle,
    collapseAll
  } = props;
  const show = collapseAll || opened;
  const hasChildren = !item.href && item.menu && item.menu.length > 0;
  const hasToggle = !item.href && !item.route;

  const handleToggle = ev => {
    ev.preventDefault();
    toggle();
  };

  return createElement(Wrapper$7, null, createElement(MenuLink, Object.assign({
    item: item
  }, hasToggle && {
    onClick: handleToggle
  }), item.name, hasChildren && createElement(Icon$2, {
    opened: show
  }, createElement(ChevronDown, {
    size: 15
  }))), hasChildren && createElement(List, {
    opened: show
  }, item.menu && item.menu.map(item => createElement("dt", {
    key: item.id
  }, createElement(MenuLink, {
    item: item,
    onClick: sidebarToggle,
    onActiveChange: setOpened
  }, item.name)))));
};

const Docz = ({
  width = 100,
  className
}) => createElement("svg", {
  width: width,
  height: width * 0.29,
  className: className,
  viewBox: "0 0 385 112"
}, createElement("path", {
  d: "M146.8,111.2 C129.4,111.2 116.35,97.25 116.35,77.45 C116.35,58.4 130.15,43.1 147.85,43.1 C156.25,43.1 162.4,46.25 166.15,49.4 L166.15,14 L156.25,14 L156.25,0.2 L182.5,0.2 L182.5,96.5 L192.25,96.5 L192.25,110 L166.15,110 L166.15,102.8 C161.35,107.45 155.2,111.2 146.8,111.2 Z M150.55,97.1 C156.7,97.1 161.65,94.4 166.15,90.5 L166.15,62.3 C161.8,59.3 156.7,57.2 150.55,57.2 C141.4,57.2 133.15,64.25 133.15,77.3 C133.15,89.9 140.95,97.1 150.55,97.1 Z M225.45,111.2 C203.7,111.2 190.5,95.45 190.5,77.15 C190.5,59.15 204,43.1 225.45,43.1 C247.2,43.1 260.4,58.85 260.4,77.15 C260.4,95.15 246.9,111.2 225.45,111.2 Z M225.45,97.55 C236.1,97.55 243.6,89.15 243.6,77.15 C243.6,65.15 236.1,56.75 225.45,56.75 C214.8,56.75 207.3,65.15 207.3,77.15 C207.3,89.15 214.8,97.55 225.45,97.55 Z M296.9,111.2 C276.2,111.2 260.6,97.7 260.6,76.55 C260.6,59.45 274.4,43.1 293.9,43.1 C311.9,43.1 323.75,54.8 323.75,65.15 C323.75,72.05 319.1,76.25 313.25,76.25 C307.85,76.25 303.35,71.75 303.35,66.35 C303.35,64.4 304.25,62.15 305.45,60.8 C304.25,59.15 300.2,56.3 293.75,56.3 C286.25,56.3 276.95,62.45 276.95,76.85 C276.95,89.45 286.55,97.4 298.25,97.4 C306.2,97.4 313.1,95.15 321.65,90.5 L320.3,105.2 C313.25,109.25 306.5,111.2 296.9,111.2 Z M323.65,110 L323.65,100.4 L363.25,57.2 L340,57.2 L340,69.35 L326.05,69.35 L326.05,44.3 L383.65,44.3 L383.65,53.75 L344.05,96.95 L370.6,96.95 L370.6,84.8 L384.4,84.8 L384.4,110 L323.65,110 Z M87,18.5 C87,19.3284477 86.2115475,20 85.2391775,20 L47.760588,20 C46.7882179,20 46,19.3284477 46,18.5 C46,17.6715523 46.7882179,17 47.760588,17 L85.239412,17 C86.2117821,17 87,17.6713524 87,18.5 Z M31.8615438,20 C30.833168,20 30,19.3284477 30,18.5 C30,17.6715523 30.833416,17 31.8615438,17 L38.1384562,17 C39.166584,17 40,17.6715523 40,18.5 C40,19.3284477 39.166584,20 38.1384562,20 L31.8615438,20 Z M31.7657124,71 L50.2342876,71 C51.2094879,71 52,71.6713524 52,72.5 C52,73.3284477 51.2094879,74 50.2342876,74 L31.7657124,74 C30.7905121,74 30,73.3286476 30,72.5 C30,71.6715523 30.7905121,71 31.7657124,71 Z M60,56.5 C60,57.3284477 59.1933987,58 58.1988865,58 L31.8011135,58 C30.8063613,58 30,57.3286476 30,56.5 C30,55.6715523 30.8063613,55 31.8011135,55 L58.1988865,55 C59.1936387,55 60,55.6713524 60,56.5 Z M73,38.5 C73,39.3286475 72.1908104,40.0001998 71.192569,40 L31.807431,40 C30.8091896,40 30,39.3284477 30,38.5 C30,37.6715523 30.8091896,37 31.807431,37 L71.192569,37 C72.1908104,37 73,37.6713524 73,38.5 Z M94.4110629,60.8520717 C95.3815188,60.8520717 96.1684193,61.6483184 96.1684193,62.6308855 L96.1684193,84.1888093 C96.1684193,90.7014865 90.9354492,96 84.503047,96 L84.2817971,96 L11.6626593,96 C5.08322545,96 0.0693980867,90.6732777 9.65270039e-05,83.6092251 C-0.0048201377,83.1344165 0.178267091,82.6773865 0.508386007,82.3398291 C0.838270796,82.0025088 1.28802855,81.8126327 1.75698472,81.8126327 L20.0341004,81.8126327 L20.0341004,11.8111907 C20.0341004,5.29851351 25.2670706,0 31.6994728,0 L104.318611,0 C110.916775,0 115.930602,5.32672231 115.999903,12.3907749 C116.00482,12.8655835 115.821733,13.3226135 115.491614,13.6601709 C115.161729,13.9974912 114.711971,14.1873673 114.243015,14.1873673 L96.1677169,14.1873673 L96.1677169,27.6014816 C96.1677169,28.5840486 95.3810506,29.3805324 94.4105946,29.3805324 C93.4401387,29.3805324 92.6534723,28.5842856 92.6534723,27.6014816 L92.6534723,12.4083165 L92.6534723,11.8111907 C92.6534723,11.6092251 92.6586231,11.4084449 92.6684564,11.2090869 C92.6719683,11.1384463 92.6794604,11.068517 92.6841429,10.9981135 C92.6928056,10.8698701 92.7005318,10.7413897 92.7131747,10.6143316 C92.7213691,10.5318386 92.7337778,10.4507679 92.7436112,10.3687491 C92.7574246,10.2552027 92.7695992,10.1411823 92.7864564,10.0285841 C92.7995675,9.94087609 92.8168929,9.85459035 92.831877,9.76735641 C92.8501389,9.66186972 92.8667619,9.55614598 92.8878333,9.45160749 C92.905627,9.36247716 92.9276349,9.27453208 92.9475357,9.18611289 C92.970246,9.08560423 92.9913174,8.98462146 93.016369,8.88506099 C93.0393134,8.79450837 93.0660039,8.70561509 93.0908213,8.61601067 C93.1175118,8.52000593 93.1425634,8.42352709 93.1715951,8.32870759 C93.1992221,8.23862907 93.230361,8.15044694 93.2598609,8.06131661 C93.2905316,7.96863055 93.3197974,7.87547039 93.3528093,7.78396958 C93.3848847,7.69483925 93.4202379,7.60736827 93.4544204,7.51918613 C93.4890712,7.42981876 93.5223172,7.33974023 93.5590751,7.25132105 C93.5953648,7.16385007 93.6349322,7.07803842 93.673329,6.99151563 C93.71196,6.90475579 93.7491861,6.8172848 93.7896901,6.73147316 C93.8299599,6.64613561 93.8735075,6.56245741 93.9158845,6.47806805 C93.9582615,6.39344165 93.9994678,6.30834115 94.0439519,6.22513704 C94.0882019,6.14193293 94.1354955,6.06062522 94.1816185,5.9788434 C94.2277415,5.89658749 94.2731621,5.81385747 94.3213923,5.7327868 C94.3693883,5.65219023 94.4199597,5.57349005 94.4698287,5.49407872 C94.5196977,5.41419329 94.5690985,5.33407082 94.6208406,5.25560768 C94.6723485,5.17809275 94.7261977,5.10223715 94.7793445,5.02590745 C94.8334278,4.94815546 94.8868087,4.87016643 94.9425309,4.79383673 C94.9970825,4.71940343 95.0537412,4.64710356 95.1099316,4.57409255 C95.1679951,4.49871105 95.2251221,4.42285545 95.2848244,4.34889624 C95.3424196,4.27754457 95.402122,4.20832634 95.4613561,4.13839696 C95.5229315,4.06538594 95.5840386,3.99213788 95.647487,3.92078621 C95.7074235,3.85346437 95.7694671,3.78803892 95.8308083,3.72190232 C95.8813797,3.66738111 95.9300781,3.6114376 95.9815861,3.55810163 L31.7001752,3.55810163 C27.2058754,3.55810163 23.5492816,7.26009186 23.5492816,11.8109536 L23.5492816,81.8126327 L74.3763566,81.8126327 C75.3400229,81.8126327 76.1238797,82.5984493 76.1334789,83.5741419 C76.1831138,88.6294434 79.6861203,92.4418984 84.2817971,92.4418984 L84.503047,92.4418984 C88.9973468,92.4418984 92.6539406,88.7399081 92.6539406,84.1890464 L92.6539406,62.6311225 C92.6539406,61.6485555 93.4406069,60.8520717 94.4110629,60.8520717 Z M96.2578558,10.5918119 C96.2562169,10.6041385 96.2550463,10.6167021 96.2543439,10.6287915 L112.318258,10.6287915 C111.563199,6.49371327 108.371815,3.55786459 104.339214,3.55786459 C104.270849,3.55786459 104.203186,3.56094622 104.135289,3.56260556 C104.072075,3.5642649 104.008861,3.564739 103.946115,3.56758358 C103.83748,3.57279866 103.729781,3.58085831 103.622317,3.59034026 C103.604289,3.59176256 103.586262,3.59271075 103.568468,3.59437009 C103.45117,3.60551138 103.334575,3.61926021 103.218682,3.63537952 C103.211424,3.63632772 103.204167,3.63727591 103.196909,3.63822411 C103.075397,3.65529162 102.954587,3.67520371 102.834948,3.69772334 C102.834246,3.69796039 102.83331,3.69796039 102.832607,3.69819744 C101.371187,3.97364808 100.046965,4.64283668 98.9709182,5.5917428 C98.9681087,5.59435034 98.965065,5.59672083 98.9622555,5.59932836 C98.8779698,5.67376167 98.7955572,5.75009136 98.7145493,5.82784335 C98.7058866,5.83637711 98.6972239,5.84467381 98.6885612,5.85297052 C98.6117675,5.92740382 98.5363787,6.00349647 98.4623946,6.08077436 C98.4504541,6.09310089 98.4389819,6.10566448 98.4272756,6.11799101 C98.3558669,6.19360956 98.2858629,6.27017631 98.2174979,6.34840239 C98.204855,6.36286236 98.1924463,6.37755939 98.1800376,6.39201936 C98.1128431,6.4700084 98.0463511,6.54894563 97.9819662,6.6295422 C97.9714305,6.64281693 97.961363,6.65632871 97.9508273,6.66960344 C97.8850377,6.75304459 97.8201845,6.8371969 97.7574385,6.92300854 C97.7555655,6.92561608 97.7539266,6.92798657 97.7520536,6.9305941 C97.55726,7.19822213 97.3790895,7.47888785 97.2168395,7.76974665 C97.2025578,7.79558497 97.1871054,7.82071213 97.1730578,7.8467875 C97.136534,7.91387229 97.1023515,7.98214233 97.0677007,8.05041237 C97.044288,8.09639982 97.0201729,8.14191318 96.9976968,8.18837473 C96.9674944,8.25071855 96.9389309,8.31448467 96.9101333,8.37777668 C96.8857841,8.4313497 96.8612008,8.48492271 96.8380222,8.53920687 C96.8118,8.6001284 96.7872167,8.66152403 96.7626334,8.7231567 C96.7392207,8.78170774 96.7160421,8.84002173 96.6940342,8.89904687 C96.671558,8.95878315 96.6502525,9.01923058 96.629181,9.07967801 C96.6074072,9.14225888 96.5863358,9.20483975 96.5662009,9.26789471 C96.5472366,9.32691985 96.5287406,9.38618203 96.5111811,9.44591832 C96.4917485,9.51181787 96.4732525,9.57842856 96.4552248,9.64503926 C96.4395383,9.70335325 96.4240859,9.76190429 96.40957,9.82069238 C96.3924787,9.89062176 96.3767922,9.96102524 96.3613399,10.0316658 C96.3489311,10.0885575 96.3362883,10.1454492 96.3250502,10.202815 C96.3103002,10.2781965 96.2974232,10.3540521 96.2847804,10.4299076 C96.2756494,10.4837177 96.2658161,10.5375278 96.2578558,10.5918119 Z M11.6624252,92.4418984 L75.9979194,92.4418984 C75.9649075,92.4068152 75.9335345,92.3698355 75.9009909,92.3342782 C75.8553361,92.284498 75.8099155,92.2344807 75.7651973,92.1837523 C75.6987052,92.1083708 75.6331497,92.0320411 75.5685307,91.9547632 C75.5252172,91.9030866 75.4819037,91.8514099 75.4392927,91.7990222 C75.3746736,91.7193738 75.3114594,91.637829 75.2487134,91.5560472 C75.2089118,91.5041335 75.1688761,91.452931 75.1297769,91.4003062 C75.0646896,91.3128352 75.0019436,91.2234678 74.9391976,91.1338634 C74.9050151,91.0847943 74.8698961,91.0366734 74.8361818,90.9871302 C74.7633683,90.8797471 74.6928961,90.7702306 74.6233604,90.660003 C74.602289,90.6265791 74.580047,90.5943405 74.5592097,90.5606795 C74.4700073,90.4165539 74.3836145,90.2700578 74.3000312,90.1211912 C74.2777891,90.081604 74.2569519,90.0408316 74.2351781,90.0007704 C74.1750074,89.8907798 74.1153051,89.7805521 74.0581781,89.6684281 C74.0282099,89.60964 74.0003488,89.5499037 73.971317,89.4906415 C73.9247258,89.3951109 73.8779004,89.2993432 73.8334163,89.2021532 C73.8032139,89.1362536 73.7744163,89.0694059 73.7453846,89.0027952 C73.7048806,88.9098721 73.6646108,88.816949 73.6259799,88.7228406 C73.5974164,88.6529113 73.5700236,88.5822707 73.5423966,88.5116302 C73.5061069,88.4187071 73.4707538,88.3253099 73.4365712,88.2309645 C73.4101149,88.1584276 73.3845951,88.0854166 73.3595435,88.0121685 C73.3269998,87.917112 73.2953927,87.8213443 73.2649562,87.7251025 C73.2415435,87.6516174 73.218365,87.5778952 73.196357,87.5036989 C73.1668571,87.4048496 73.1392301,87.3050521 73.1118372,87.2050175 C73.0919364,87.1320065 73.0715674,87.0589955 73.0528373,86.9852733 C73.0259127,86.8802608 73.0013293,86.7738259 72.9769801,86.667391 C72.9610595,86.5972246 72.9439683,86.5275322 72.9289841,86.4566546 C72.9036984,86.3386044 72.8814564,86.2188948 72.8592143,86.0991851 C72.8479762,86.0387377 72.8353334,85.9792385 72.8250318,85.918554 C72.7938929,85.7374488 72.7657977,85.5551583 72.7416826,85.3709714 L21.7919251,85.3709714 L3.68338077,85.3709714 C4.43844,89.5060497 7.62982365,92.4418984 11.6624252,92.4418984 Z M120.998408,32.7899677 C120.998647,32.8098599 121.000556,32.8297522 120.99984,32.850118 C120.998408,32.9064794 120.993634,32.9621303 120.986951,33.0170708 C120.986712,33.0203861 120.986712,33.0234647 120.986235,33.0267801 C120.975971,33.1077699 120.958785,33.1863916 120.938019,33.2635925 C120.933962,33.2787485 120.929665,33.2934308 120.92513,33.30835 C120.878347,33.4655934 120.810559,33.6131276 120.72463,33.7488211 C120.716514,33.7616089 120.708399,33.77416 120.700045,33.7867111 C120.654455,33.854913 120.605285,33.9202732 120.551102,33.981134 C120.54776,33.9846862 120.54418,33.9880016 120.540838,33.9917906 C120.485939,34.0526514 120.426267,34.1087759 120.363491,34.1615851 C120.358478,34.1658477 120.354659,34.1708208 120.349647,34.1748466 C116.038893,37.7064298 112.307441,41.2448806 107.873046,46.0062306 C102.802778,51.4498371 91.7857706,58.7815489 86.0428726,60.5339606 C83.3864839,61.3445694 81.1912456,61.9366004 79.2545094,62.4594822 C75.5209096,63.4666453 72.7568714,64.2130779 69.3242606,65.8091935 L66.5163033,75.703689 C66.2938436,76.487538 65.5749072,77 64.7927178,77 C64.632079,77 64.4685759,76.9786869 64.3062662,76.9332189 C63.354129,76.6670418 62.7994119,75.6852176 63.0674615,74.7405729 L66.0950142,64.0724114 C66.1009815,64.0513351 66.1074262,64.0304956 66.1141095,64.0098929 C66.2733162,63.5189808 66.4310907,63.0273583 66.589104,62.5354989 C68.5186795,56.5263844 70.5141337,50.3124272 74.8387316,45.4144364 C84.7202875,34.2226827 104.265713,30.6427897 119.255011,31.0276098 C119.339269,31.0297412 119.421379,31.0396873 119.502295,31.0529488 C119.520435,31.0557905 119.538337,31.0588691 119.556239,31.0624213 C119.637155,31.0782877 119.716639,31.0979431 119.793259,31.1239925 C119.793736,31.1239925 119.794214,31.1242293 119.794691,31.1244661 C119.871788,31.1507523 119.945305,31.1836692 120.017151,31.2196647 C120.030995,31.2265323 120.0446,31.233163 120.058205,31.2405042 C120.128619,31.2783942 120.196885,31.3198363 120.261331,31.3662516 C120.269208,31.3719351 120.276369,31.378329 120.284007,31.3840125 C120.341293,31.4268755 120.395714,31.473054 120.447271,31.5223109 C120.459445,31.5339147 120.472095,31.5450449 120.48403,31.5571224 C120.53869,31.6120628 120.58977,31.6703187 120.636792,31.7318899 C120.646101,31.7442042 120.654694,31.7572288 120.663764,31.7697799 C120.706489,31.8287462 120.745635,31.8900806 120.780961,31.9540199 C120.785735,31.9630188 120.791225,31.9713072 120.795998,31.9803061 C120.834189,32.0527707 120.866651,32.1285507 120.894816,32.2064619 C120.896965,32.2126191 120.900545,32.2183026 120.902693,32.2244597 C120.905319,32.2318009 120.906274,32.2396157 120.90866,32.2471937 C120.959502,32.3997009 120.989815,32.5607333 120.996976,32.7279228 C120.997692,32.7487623 120.998169,32.769365 120.998408,32.7899677 Z M77.5340269,47.756511 C75.2953469,50.2920613 73.752689,53.2567157 72.4766485,56.4636291 C76.7888345,52.5955355 82.6281636,48.2464759 88.0376107,44.6611362 C91.3895441,42.4395991 97.3876024,38.6593629 103.660632,35.6411889 C101.191855,36.0456645 98.7963549,36.5581265 96.5295094,37.1757332 C88.0946578,39.4737607 81.7037145,43.0337614 77.5340269,47.756511 Z M105.24172,43.5935859 C108.084287,40.541311 110.64878,37.9761591 113.255998,35.5938264 C107.252689,37.4175187 99.0698944,41.6242541 90.0278137,47.6172653 C84.8055001,51.0785153 79.7992015,54.8284396 75.9309802,58.1760196 C74.9697728,59.0079415 74.1544054,59.7489275 73.4588607,60.4098709 C75.0136919,59.9201429 76.5859475,59.4953014 78.3143067,59.0290178 C80.2245483,58.513714 82.3894729,57.9292611 84.9897693,57.1359395 C89.6492502,55.7143547 100.307028,48.8917896 105.24172,43.5935859 Z"
}));

const IconFirst = p => !p.opened ? '0px' : '10px';

const IconMiddle = p => !p.opened ? '1' : '0';

const IconLast = p => !p.opened ? '0px' : '-6px';

const IconRotate = p => !p.opened ? '0deg' : '45deg';

const Icon$3 = styled.div.withConfig({
  displayName: "Hamburger__Icon"
})(["position:relative;width:23px;height:32px;transform:translateX(", ") translateY(", ") scale(", ");"], p => p.opened ? '-2px' : '-1px', p => p.opened ? '0' : '2px', p => p.opened ? 0.8 : 1);
const sidebarBg = get('colors.sidebarBg');
const sidebarPrimary$2 = get('colors.sidebarPrimary');
const sidebarText$1 = get('colors.sidebarText');
const primaryColor$2 = get('colors.primary');
const backgroundColor$1 = get('colors.background');
const textColor$1 = get('colors.text');
const IconLine = styled.span.withConfig({
  displayName: "Hamburger__IconLine"
})(["content:'';display:block;position:absolute;width:100%;height:2px;left:0;right:0;background:", ";transition:transform 0.3s,opacity 0.3s;&:nth-of-type(1){top:-2px;transform:translateY(", ") rotate(", ");}&:nth-of-type(2){top:6px;opacity:", ";}&:nth-of-type(3){top:14px;transform:translateY(", ") rotate(-", ");}"], p => p.opened ? sidebarText$1(p) : textColor$1(p), IconFirst, IconRotate, IconMiddle, IconLast, IconRotate);

const translateX = p => !p.opened ? '10px' : '-6px';

const translateY = p => !p.opened ? '4px' : '0px';

const radii = get('radii');
const ToggleButton = styled.button.withConfig({
  displayName: "Hamburger__ToggleButton"
})(["cursor:pointer;z-index:99;position:absolute;display:flex;align-items:center;justify-content:center;padding:5px 6px;width:33px;height:30px;top:", ";right:", ";transform:translateX(", ") translateY(", ");transition:transform 0.3s;outline:none;border:none;background:", ";border-radius:", ";&:before{position:absolute;content:'';top:-3px;left:0;width:calc(100% + 1px);height:", ";background:", ";}", ";"], p => p.opened ? '3px' : '2px', p => p.opened ? '-39px' : '-27px', translateX, translateY, p => p.opened ? sidebarBg(p) : backgroundColor$1(p), p => p.opened ? `0 0 ${radii(p)} 0` : `${radii(p)}`, p => p.opened ? '3px' : 0, p => sidebarPrimary$2(p) || primaryColor$2(p), mq({
  display: ['block', 'block', 'block', 'none']
}));
const Hamburger = ({
  opened,
  onClick
}) => createElement(ToggleButton, {
  opened: opened,
  onClick: onClick
}, createElement(Icon$3, {
  opened: opened
}, createElement(IconLine, {
  opened: opened
}), createElement(IconLine, {
  opened: opened
}), createElement(IconLine, {
  opened: opened
})));

const sidebarBg$1 = get('colors.sidebarBg');
const sidebarText$2 = get('colors.sidebarText');
const sidebarBorder$1 = get('colors.sidebarBorder');
const Wrapper$8 = styled.div.withConfig({
  displayName: "Sidebar__Wrapper"
})(["position:relative;width:280px;min-width:280px;min-height:100vh;background:", ";transition:transform 0.2s,background 0.3s;z-index:1000;", ";dl{padding:0;margin:0 16px;}dl a{font-weight:400;}@media screen and (max-width:", "px){transform:translateX(", ");position:", ";}", ";"], sidebarBg$1, mq({
  position: ['absolute', 'absolute', 'absolute', 'relative']
}), breakpoints.desktop - 1, p => p.opened ? '-100%' : '0', p => p.opened ? 'auto' : 'fixed', get('styles.sidebar'));
const Content = styled.div.withConfig({
  displayName: "Sidebar__Content"
})(["position:fixed;top:0;left:0;display:flex;flex-direction:column;width:280px;min-width:280px;height:100%;max-height:100vh;"]);
const Menus = styled.nav.withConfig({
  displayName: "Sidebar__Menus"
})(["flex:1;overflow-y:auto;margin-bottom:10px;"]);
const Empty = styled.div.withConfig({
  displayName: "Sidebar__Empty"
})(["flex:1;opacity:0.7;padding:0 24px;color:", ";"], sidebarText$2);
const Footer = styled.div.withConfig({
  displayName: "Sidebar__Footer"
})(["padding:10px 0;display:flex;align-items:center;justify-content:center;font-size:14px;color:", ";border-top:1px dashed ", ";"], sidebarText$2, sidebarBorder$1);
const FooterLink = styled.a.withConfig({
  displayName: "Sidebar__FooterLink"
})(["padding:0;margin:0;margin-left:5px;"]);
const FooterLogo = styled(Docz).withConfig({
  displayName: "Sidebar__FooterLogo"
})(["fill:", ";"], sidebarText$2);
const ToggleBackground = styled.div.withConfig({
  displayName: "Sidebar__ToggleBackground"
})(["content:'';display:", ";position:fixed;background-color:rgba(0,0,0,0.4);width:100vw;height:100vh;top:0;bottom:0;left:0;right:0;cursor:pointer;z-index:99;"], p => p.opened ? 'none' : 'block');
const Sidebar = () => {
  const [hidden, setHidden] = useState$1(true);
  const [query, setQuery] = useState$1('');
  const menus = useMenus({
    query
  });
  const windowSize = useWindowSize();
  const isDesktop = windowSize.innerWidth >= breakpoints.desktop;
  const prevIsDesktop = usePrevious(isDesktop);
  useEffect$1(() => {
    if (!hidden && !prevIsDesktop && isDesktop) {
      setHidden(true);
      document.documentElement.classList.remove('with-overlay');
    }
  });

  const addOverlayClass = isHidden => {
    const method = !isHidden ? 'add' : 'remove';

    if (typeof window !== 'undefined' && !isDesktop) {
      document.documentElement.classList[method]('with-overlay');
    }
  };

  const handleSidebarToggle = () => {
    if (isDesktop) return;
    setHidden(s => !s);
    addOverlayClass(!hidden);
  };

  return createElement(Fragment, null, createElement(Wrapper$8, {
    opened: hidden
  }, createElement(Content, null, createElement(Hamburger, {
    opened: !hidden,
    onClick: handleSidebarToggle
  }), createElement(Logo, {
    showBg: !hidden
  }), createElement(Search, {
    onSearch: setQuery
  }), createElement(Scrollbar, null, menus && menus.length === 0 ? createElement(Empty, null, "No documents found.") : createElement(Menus, null, menus && menus.map(menu => createElement(Menu, {
    key: menu.id,
    item: menu,
    sidebarToggle: handleSidebarToggle,
    collapseAll: Boolean(query.length)
  })))), createElement(Footer, null, "Built with", createElement(FooterLink, {
    href: "https://docz.site",
    target: "_blank"
  }, createElement(FooterLogo, {
    width: 40
  }))))), createElement(ToggleBackground, {
    opened: hidden,
    onClick: handleSidebarToggle
  }));
};

const Main = styled.div.withConfig({
  displayName: "Main"
})(["display:flex;"]);

const Wrapper$9 = styled.div.withConfig({
  displayName: "NotFound__Wrapper"
})(["display:flex;align-items:center;justify-content:center;flex-direction:column;width:100%;height:100vh;color:", ";background:", ";"], get('colors.text'), get('colors.background'));
const Title = styled.h1.withConfig({
  displayName: "NotFound__Title"
})(["margin:0;font-size:42px;font-weight:400;color:", ";"], get('colors.primary'));
const Subtitle = styled.p.withConfig({
  displayName: "NotFound__Subtitle"
})(["margin:0;font-size:18px;"]);
const NotFound = () => createElement(Main, null, createElement(Sidebar, null), createElement(Wrapper$9, null, createElement(Title, null, "Page Not Found"), createElement(Subtitle, null, "Check if you changed the document route or deleted it!")));

const OrderedList = styled.ol.withConfig({
  displayName: "OrderedList"
})(["list-style:none;counter-reset:my-awesome-counter;& li{counter-increment:my-awesome-counter;}& li::before{content:counter(my-awesome-counter) '. ';color:", ";font-weight:bold;font-family:'Playfair Display',serif;margin-right:5px;}", ";"], get('colors.border'), get('styles.ol'));

const {
  useEffect,
  useState
} = React;
const Wrapper$a = styled.div.withConfig({
  displayName: "Page__Wrapper"
})(["flex:1;color:", ";background:", ";min-width:0;position:relative;"], get('colors.text'), get('colors.background'));
const Container = styled.div.withConfig({
  displayName: "Page__Container"
})(["box-sizing:border-box;margin:0 auto;", " ", ";"], mq({
  width: ['100%', '100%', 920],
  padding: ['20px', '0 40px 40px']
}), get('styles.container'));
const EditPage = styled(ButtonLink.withComponent('a')).withConfig({
  displayName: "Page__EditPage"
})(["display:flex;align-items:center;justify-content:center;position:absolute;padding:2px 8px;margin:8px;border-radius:", ";border:1px solid ", ";opacity:0.7;transition:opacity 0.4s;font-size:14px;color:", ";text-decoration:none;text-transform:uppercase;&:hover{opacity:1;background:", ";}", ";"], get('radii'), get('colors.border'), get('colors.text'), get('colors.border'), mq({
  visibility: ['hidden', 'hidden', 'visible'],
  top: [0, -60, 32],
  right: [0, 0, 40]
}));
const EditIcon = styled(Edit).withConfig({
  displayName: "Page__EditIcon"
})(["margin-right:5px;"]);
const Page = ({
  children,
  doc: {
    value: {
      link,
      fullpage,
      edit = true
    }
  }
}) => {
  const [containerHeight, setContainerHeight] = useState(0);
  useEffect(() => {
    const setHeight = () => {
      setContainerHeight(window.innerHeight);
    };

    setHeight();
    window.addEventListener('resize', setHeight);
    return () => {
      window.removeEventListener('resize', setHeight);
    };
  });
  const {
    repository,
    themeConfig
  } = useConfig();
  const content = createElement(Fragment, null, false && createElement(EditPage, {
    href: link,
    target: "_blank"
  }, createElement(EditIcon, {
    width: 14
  }), " Edit page"), children);
  return createElement(GlobarBarOptionsContext.Provider, {
    value: {
      barBg: themeConfig.colors.primary
    }
  }, createElement(Main, null, repository && createElement(GithubLink, {
    repository: repository
  }), !fullpage && createElement(Sidebar, null), createElement(Scrollbar, {
    style: {
      height: containerHeight + 'px'
    }
  }, createElement(Wrapper$a, null, fullpage ? content : createElement(Container, null, content)))));
};

const Paragraph = styled.p.withConfig({
  displayName: "Paragraph"
})(["color:", ";", ";"], get('colors.text'), get('styles.paragraph'));

const Pre$1 = props => createElement(Editor, Object.assign({}, props));

const Wrapper$b = styled.div.withConfig({
  displayName: "PropsRaw__Wrapper"
})(["display:flex;flex-direction:column;& ~ &{margin-top:20px;}"]);
const Title$1 = styled.div.withConfig({
  displayName: "PropsRaw__Title"
})(["display:flex;border-bottom:1px solid ", ";"], get('colors.propsBg'));
const PropName = styled.span.withConfig({
  displayName: "PropsRaw__PropName"
})(["background:", ";color:", ";padding:5px 10px;border-radius:4px 4px 0 0;font-size:16px;font-weight:500;& ~ &{margin-left:5px;}"], get('colors.propsBg'), get('colors.primary'));
const PropType = styled(PropName).withConfig({
  displayName: "PropsRaw__PropType"
})(["color:", ";background:", ";font-weight:400;"], get('colors.propsText'), get('colors.propsBg'));
const PropDefaultValue = styled(PropType).withConfig({
  displayName: "PropsRaw__PropDefaultValue"
})(["background:transparent;padding-left:0;padding-right:0;"]);
const PropRequired = styled(PropType).withConfig({
  displayName: "PropsRaw__PropRequired"
})(["flex:1;text-align:right;background:transparent;opacity:0.5;"]);
const PropsRaw = ({
  props,
  getPropType
}) => {
  const entries = Object.entries(props);
  const components = useComponents();
  const Paragraph = useMemo(() => styled(components.P || 'p').withConfig({
    displayName: "PropsRaw__Paragraph"
  })(["font-size:16px;color:", ";"], get('colors.sidebarText')), []);
  return createElement(Fragment, null, entries.map(([key, prop]) => {
    if (!prop.type && !prop.flowType) return null;
    return createElement(Wrapper$b, {
      key: key
    }, createElement(Title$1, null, createElement(PropName, null, key), createElement(PropType, null, getPropType(prop)), prop.defaultValue && createElement(PropDefaultValue, null, prop.defaultValue.value === "''" ? createElement("em", null, "= [Empty String]") : createElement("em", null, "= ", prop.defaultValue.value.replace(/\'/g, '"'))), prop.required && createElement(PropRequired, null, createElement("em", null, "required"))), prop.description && createElement(Paragraph, null, prop.description));
  }));
};

const breakpoint = '600px';
const Container$1 = styled.div.withConfig({
  displayName: "PropsTable__Container"
})(["border:1px solid ", ";border-radius:4px;overflow:hidden;background:", ";color:", ";"], get('colors.border'), get('colors.propsBg'), get('colors.propsText'));
const Line = styled.div.withConfig({
  displayName: "PropsTable__Line"
})(["padding:8px 0;@media (min-width:", "){padding:O;}& + &{border-top:1px solid ", ";}"], breakpoint, get('colors.border'));
const Column = styled.div.withConfig({
  displayName: "PropsTable__Column"
})(["min-width:0;padding:2px 15px;word-wrap:break-word;@media (min-width:", "){padding:8px 15px;}"], breakpoint);
const ColumnName = styled(Column).withConfig({
  displayName: "PropsTable__ColumnName"
})(["@media (min-width:", "){flex-basis:25%;}"], breakpoint);
const ColumnType = styled(Column).withConfig({
  displayName: "PropsTable__ColumnType"
})(["@media (min-width:", "){flex-basis:50%;}"], breakpoint);
const ColumnValue = styled(Column).withConfig({
  displayName: "PropsTable__ColumnValue"
})(["@media (min-width:", "){flex-basis:25%;}"], breakpoint);
const Content$1 = styled.div.withConfig({
  displayName: "PropsTable__Content"
})(["display:flex;flex-direction:column;font-family:", ";@media (min-width:", "){flex-wrap:nowrap;flex-direction:row;}"], get('fonts.mono'), breakpoint);
const PropName$1 = styled.span.withConfig({
  displayName: "PropsTable__PropName"
})(["color:", ";font-weight:bold;"], get('colors.primary'));
const PropType$1 = styled.span.withConfig({
  displayName: "PropsTable__PropType"
})(["font-size:0.9em;"]);
const PropDefaultValue$1 = styled.span.withConfig({
  displayName: "PropsTable__PropDefaultValue"
})(["font-size:0.9em;"]);
const PropRequired$1 = styled.span.withConfig({
  displayName: "PropsTable__PropRequired"
})(["font-size:0.8em;opacity:0.8;"]);
const PropsTable = ({
  props,
  getPropType
}) => {
  const entries = Object.entries(props);
  const components = useComponents();
  const Paragraph = useMemo(() => styled(components.P || 'p').withConfig({
    displayName: "PropsTable__Paragraph"
  })(["margin:0;font-size:16px;color:", ";padding:0 15px 8px 15px;"], get('colors.blockquoteColor')), []);
  return createElement(Container$1, null, entries.map(([key, prop]) => {
    if (!prop.type && !prop.flowType) return null;
    return createElement(Line, {
      key: key
    }, createElement(Content$1, null, createElement(ColumnName, null, createElement(PropName$1, null, key)), createElement(ColumnType, null, createElement(PropType$1, null, getPropType(prop))), createElement(ColumnValue, null, prop.defaultValue && createElement(PropDefaultValue$1, null, prop.defaultValue.value === "''" ? createElement("em", null, "= [Empty String]") : createElement("em", null, "= ", prop.defaultValue.value.replace(/\'/g, '"'))), prop.required && createElement(PropRequired$1, null, createElement("strong", null, "required")))), prop.description && createElement(Paragraph, null, prop.description));
  }));
};

const Container$2 = styled.div.withConfig({
  displayName: "Props__Container"
})(["margin:20px 0;"]);
const Props = _a => {
  var {
    title,
    isRaw,
    isToggle
  } = _a,
      props = __rest(_a, ["title", "isRaw", "isToggle"]);

  const [isOpen, setIsOpen] = useState$1(true);
  const components = useComponents();
  const Title = useMemo(() => styled(components.H3 || 'h3').withConfig({
    displayName: "Props__Title"
  })(["padding:8px 0;position:relative;", " ", " ", ""], !isRaw ? 'margin-bottom: 0;' : '', !isOpen || isRaw ? 'border-bottom: 1px solid rgba(0, 0, 0, 0.1);' : '', isToggle ? `
        cursor: pointer;
        padding-right: 40px;

        &::after {
          content: '';
          position: absolute;
          top: 50%;
          right: 16px;
          transform: translateY(-50%) ${isOpen ? 'rotate(-135deg)' : 'rotate(45deg)'};
          ${!isOpen ? 'margin-top: -2px;' : ''}
          width: 8px;
          height: 8px;
          border-bottom: 2px solid;
          border-right: 2px solid;
        }
      ` : ''), [isOpen]);
  const titleProps = isToggle ? {
    onClick: () => setIsOpen(open => !open),
    onkeydown: () => setIsOpen(open => !open),
    role: 'button',
    tabindex: 0
  } : {};
  return createElement(Container$2, null, (!!title || isToggle) && createElement(Title, Object.assign({}, titleProps), title || 'Component props'), isOpen && createElement("div", null, isRaw ? createElement(PropsRaw, Object.assign({}, props)) : createElement(PropsTable, Object.assign({}, props))));
};

const Wrapper$c = styled.div.withConfig({
  displayName: "Table__Wrapper"
})(["overflow-x:auto;padding:2px;margin-bottom:30px;", ";"], mq({
  marginBottom: [20, 40],
  maxWidth: ['calc(100vw - 40px)', 'calc(100vw - 80px)', '100%']
}));
const TableStyled = styled.table.withConfig({
  displayName: "Table__TableStyled"
})(["padding:0;table-layout:auto;box-shadow:0 0 0 1px ", ";background-color:transparent;border-spacing:0;border-collapse:collapse;border-style:hidden;border-radius:", ";font-size:14px;color:", ";", " & thead{color:", ";background:", ";}& thead th{font-weight:400;padding:20px 20px;&:nth-of-type(1){", ";}&:nth-of-type(2){", ";}&:nth-of-type(3){", ";}&:nth-of-type(4){", ";}&:nth-of-type(5){", ";}}& tbody td{padding:12px 20px;line-height:2;font-weight:200;}& tbody > tr{display:table-row;border-top:1px solid ", ";}", ";"], get('colors.border'), get('radii'), get('colors.tableColor'), mq({
  overflowX: ['initial', 'initial', 'initial', 'hidden'],
  display: ['table', 'table', 'table', 'table']
}), get('colors.theadColor'), get('colors.theadBg'), mq({
  width: ['20%', '20%', '20%', 'auto']
}), mq({
  width: ['10%', '10%', '10%', 'auto']
}), mq({
  width: ['10%', '10%', '10%', 'auto']
}), mq({
  width: ['10%', '10%', '10%', 'auto']
}), mq({
  width: ['20%', '20%', '20%', 'auto']
}), get('colors.border'), get('styles.table'));
const Table = props => createElement(Wrapper$c, null, createElement(TableStyled, Object.assign({}, props)));

const UnorderedList = styled.ul.withConfig({
  displayName: "UnorderedList"
})(["list-style:none;& li::before{content:'\u25CF ';color:", ";font-weight:bold;font-size:0.5em;margin-right:5px;}", ";ul li{padding-left:25px;}"], get('colors.border'), get('styles.ul'));

const components = {
  a: Link,
  blockquote: Blockquote,
  editor: Editor,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  hr: Hr,
  inlineCode: InlineCode,
  loading: Loading,
  notFound: NotFound,
  ol: OrderedList,
  p: Paragraph,
  page: Page,
  playground: Playground,
  pre: Pre$1,
  props: Props,
  table: Table,
  ul: UnorderedList
};

const Global = createGlobalStyle`
  @import url('https://unpkg.com/codemirror@5.42.0/lib/codemirror.css');
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600');
  @import url('https://fonts.googleapis.com/css?family=Inconsolata');

  .icon-link {
    display: none;
  }

  body {
    margin: 0;
    padding: 0;
    ${get('styles.body')};
  }

  .with-overlay {
    overflow: hidden;
  }

  html,
  body,
  #root {
    height: 100%;
    min-height: 100%;
  }
`;

const styles = {
  body: css(["font-family:", ";font-size:16px;line-height:1.6;"], get('fonts.ui')),
  h1: css(["margin:40px 0 20px;font-family:", ";font-size:48px;font-weight:600;letter-spacing:-0.02em;"], get('fonts.display')),
  h2: css(["margin:30px 0 15px;line-height:1.4em;font-family:", ";font-weight:500;font-size:28px;letter-spacing:-0.02em;"], get('fonts.display')),
  h3: css(["margin:25px 0 10px;font-size:20px;font-weight:400;"]),
  h4: css(["margin:25px 0 10px;font-size:16px;font-weight:400;"]),
  h5: css(["margin:20px 0 10px;font-size:16px;font-weight:400;"]),
  h6: css(["margin:20px 0 10px;font-size:16px;font-weight:400;text-transform:uppercase;"]),
  ol: css(["padding:0;margin:10px 0 10px;"]),
  ul: css(["padding:0;margin:10px 0 10px;"]),
  playground: css(["padding:40px;"]),
  code: css(["margin:0 3px;border-radius:3px;font-family:", ";padding:2px 5px;font-size:0.8em;border:'1px solid rgba(0, 0, 0, 0.02)';"], get('fonts.mono')),
  pre: css(["font-family:", ";font-size:1em;line-height:1.8;"], get('fonts.mono')),
  paragraph: css(["margin:10px 0 20px 0;"]),
  table: css(["overflow-y:hidden;width:100%;font-family:", ";font-size:16px;overflow-x:initial;display:block;"], get('fonts.mono')),
  blockquote: css(["margin:25px 0;padding:20px;font-style:italic;font-size:16px;"])
};

const fonts = {
  /**
   * Used for headings larger than 20px.
   */
  display: '"Source Sans Pro", sans-serif',

  /**
   * Used for code and sometimes numbers in tables.
   */
  mono: '"Inconsolata", monospace',

  /**
   * Used for text and UI (which includes almost anything).
   */
  ui: '"Source Sans Pro", sans-serif'
};

const config = {
  colors,
  styles,
  fonts,
  radii: '2px',
  mode: 'light',
  showPlaygroundEditor: false,
  linesToScrollEditor: 18
};

const Theme = ({
  children
}) => createElement(ThemeProvider, null, createElement(Global, null), createElement(ComponentsProvider, {
  components: components
}, children));

const enhance = theme(config, _a => {
  var {
    mode,
    codemirrorTheme
  } = _a,
      config = __rest(_a, ["mode", "codemirrorTheme"]);

  return Object.assign({}, config, {
    mode,
    codemirrorTheme: codemirrorTheme || `docz-${mode}`,
    colors: Object.assign({}, getter(modes, mode), config.colors)
  });
});
var index = enhance(Theme);

export default index;
export { components, enhance };
