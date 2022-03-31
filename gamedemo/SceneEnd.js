import { MMGameScene, MMGameSceneEvent, PGlobal } from "@taojimu/mmgamelite-miniapp-v6";

// 引入Adobe Animate导出的布局\动画文件
import layoutLib from "/resources/scene_end";
/**
 * 开始场景定义
 */
export class SceneEnd extends MMGameScene {
  constructor(options) {

    super(options);
    // 初始化 Adobe Animate导出文件的布局
    this.initAnimateBackground(layoutLib);
    // 监听场景初始化完成
    this.on(MMGameSceneEvent.SCENE_INITED, this.onInited, this);

    // 场景被添加到舞台上时触发
    this.on('added', () => { });

    // 场景从舞台移除时触发
    this.on('removed', () => { });
  }
  /**
   * 场景初始化完成
   * @param {*} e 
   */
  onInited(e) {

    // this.interactiveObjInAnimate 存储有动画文件内设置了name的对象映射

    const { btn_retry } = this.interactiveObjInAnimate;
    this.btnRetry = btn_retry;

    this.bindEvent();
  }
  bindEvent() {
    const btn_retry = this.btnRetry;
    btn_retry.interactive = true;
    btn_retry.on('tap', this.retryGame, this);
  }
  retryGame() {
    console.log('goto sceneGame');
    PGlobal.Application.stage.emit(MMGameSceneEvent.SCENE_CHANGE, { sceneName: 'sceneStart' });
    
  }
}