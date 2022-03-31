import { 
  MMGameApplication, 
  MMGameSceneControl, 
  MMGameAnimate, 
  MMGamePopManager, 
  MMGamePopEvent, 
  MMGameAnimateEvent, 
  PGlobal, 
  TJMCompHelper } from "@taojimu/mmgamelite-miniapp-v6";

// 引入Adobe Animate导出的布局\动画文件
import popChildLib from "/resources/popchild";

// 引入互动需要场景文件模块
import { ScenePreload } from "./ScenePreload";
import { SceneStart } from "./SceneStart";
import { SceneGame } from "./SceneGame";
import { SceneEnd } from "./SceneEnd";

export class MainApplication extends MMGameApplication {
  constructor(options) {

    super(options.width, options.height, options);

    this.initSceneControl();

    this.initPopManager();

    this.bind();

    // 开启淘积木编辑态meta联动
    if (my.isIDE) {
      TJMCompHelper.bindTJMEditorEvent(() => {}, this);
    }

  }
  initSceneControl() {
    const { basePath } = PGlobal.Options;
    const sceneControl = new MMGameSceneControl({
      isAnimate: false,
      basePath: basePath,
      // 场景切换方式：none | slideInRight | slideFadeInRight | slideFadeInLeft | fadeIn
      transition: 'slideFadeInRight',
      transitionDuration: .25,
      transitionDelay: 0,
      // 场景切换后不可见时是否进行销毁
      autoDestroy: false, 
      // 场景是否自动实例化
      autoInstance: true,
      scenes: [
        {  
          // 场景类构建函数
          ctor: ScenePreload, 
          // 指定场景唯一名称， name: preloader 为加载场景独有。
          name: 'preloader'
        },
        {  
          ctor: SceneStart, 
          name: 'sceneStart', 
          // 是否默认场景
          default: true,
        },
        {
          ctor: SceneGame,
          name: 'sceneGame',
        },
        { 
          ctor: SceneEnd,
          name: 'sceneEnd',
        }
      ]
    });
    this.stage.addChild(sceneControl);
  }

  /**
   * 初始化浮层容器对象
   */
  initPopManager() {
    console.log('initPopManager');
    this.popManager = new MMGamePopManager({
      popLayerWidth: PGlobal.StageSize.width,
      popLayerHeight: PGlobal.StageSize.height,
      backgroundAlpha: 0.7,
      backgroundColor: 0x000000,
      isFullStage: true
    });
    this.popManager
      .on(MMGamePopEvent.POP_OPEN_BEFORE, () => {
        console.log('BEFORE 浮层弹出前触发');
      })
      .on(MMGamePopEvent.POP_OPENED, e => {
        // 浮层弹出时触发
        console.log('浮层已经弹出');
      }, this)
      .on(MMGamePopEvent.POP_CLOSED, e => {
        // 浮层关闭时触发
        console.log('浮层已经关闭');
      }, this)
      .on(MMGamePopEvent.POP_CHILDREN_DESTROYED, e => {
        // 浮层销毁时触发
        console.log('浮层已经销毁');
      }, this);
    this.stage.addChild(this.popManager);
    this.stage.setChildIndex(this.popManager, this.stage.children.length - 1);
  }

  /**
   * 绑定事件监听
   */
  bind() {
    this.stage.on('SHOW_POP', () => {
      if (this.popManager) {
        this.showPop();
      }
    }, this);
  }

  showPop() {
    let animateOptions = {
      basePath: PGlobal.Options.basePath,
      animateLib: popChildLib,
      movieClipName: ''
    };

    // 加载pop动画文件
    const popChild = new MMGameAnimate(animateOptions);
    popChild.once(MMGameAnimateEvent.ANIMATE_LOAD_COMPLETE, e => {
      // 展示pop动画内容，this.popManager.openPop(displayobject: IDisplayObject, closeButton: IDisplayObject)
      this.popManager.openPop(popChild, popChild.interactiveObjInAnimate['btn_close']);  
    }, this);

  }
}