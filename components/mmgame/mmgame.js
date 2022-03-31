import { MainApplication } from '/gamedemo/MainApplication';
import { PGlobal } from '@taojimu/mmgamelite-miniapp-v6';
import getApplicationOptions from '/gamedemo/ApplicationOptions';

// 互动玩法的具体实现逻辑

Component({
  mixins: [],
  data: {
    mmgameCanvasOptions: {
      // 手动指定application的尺寸
      // width:750,
      // height:750,
      // 全屏-以窗口宽高作为application的尺寸，当设置此选项后，手动设置的width\height会失效
      isFullScreen: true,
    },
  },
  props: {
    // 组件的编辑数据
    compExt: null
  },
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    onMMGameCanvasError(e) {
      console.log(e);
    },
    onMMGameCanvasDidUnmount(e) {
      this.canvas = null;
      this.mmgameApplication && this.mmgameApplication.destroy();
    },
    onCanvasInit(e) {
      const { canvas, options } = e;
      const ApplicationOptions = getApplicationOptions();
      console.log('ApplicationOptions', ApplicationOptions);
      const mmgameApplicationOptions = {
        view: canvas,
        ...ApplicationOptions,
        ...options
      };
      PGlobal.debug = false;
      PGlobal.hasSetHdLog = false;
      PGlobal.Options = mmgameApplicationOptions;
      PGlobal.CustomResourceMap = {};
      PGlobal.UserData = null;
      PGlobal.globalPropertys = {};
      PGlobal.pass = 0;
      PGlobal.tasks = null;
      PGlobal.cartItems = [];
      PGlobal.favorItems = [];
      PGlobal.isMember = false;
      PGlobal.hasFavor = false;
      // console.log("mmgameApplicationOptions:",mmgameApplicationOptions);
      // console.log("mmgameApplicationOptions.resource:",mmgameApplicationOptions.resource);
      const customResource = mmgameApplicationOptions.resource;
      if (customResource && customResource.length > 0) {
        for (let k = 0; k < customResource.length; k++) {
          let resouce = customResource[k];
          if (resouce.type === 'image' && resouce.url.startsWith('//')) { 
            resouce.url = `https:${resouce.url}`;
          }
          PGlobal.CustomResourceMap[customResource[k].name] = resouce;
        }
      }
      // console.log("PGlobal.CustomResourceMap:",PGlobal.CustomResourceMap);
      this.canvas = canvas;
      this.mmgameApplication = new MainApplication(
        mmgameApplicationOptions
      );
      PGlobal.resolution = this.mmgameApplication.renderer.resolution;
    }
  },
});
