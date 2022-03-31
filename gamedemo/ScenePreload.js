import { MMGameScene, MMGameEvent, MMGameSceneEvent } from "@taojimu/mmgamelite-miniapp-v6";

// 引入Adobe Animate导出的布局\动画文件
import layoutLib from "/resources/scene_preload";
/**
 * 开始场景定义
 */
export class ScenePreload extends MMGameScene {
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
   * hook淘积木互动编辑器的切换场景.切换步骤方法
   * @param {string} stepName 
   */
  hookChangeStepFunction(stepName) {
    console.log('改变阶段', stepName);
  }
  /**
   * 场景初始化完成
   * @param {*} e 
   */
  onInited(e) {
    // TODO onInited 会触发2次，需要排查下看看
    console.log('scenePreload onInited');
    // const text = new PIXI.Text('资源加载中...');
    // text.anchor.set(.5);
    // text.position.set(PGlobal.Options.baseWidth / 2, PGlobal.Options.baseHeight / 2);
    // this.addChild(text);

    try {
    const { barProgress, txtProgress } = this.interactiveObjInAnimate;

    const target = 100;
    let count = 0;
    const interval = setInterval(() => { 
      txtProgress.text = `${count}%`;
      barProgress.gotoAndStop(count);
      if (count>=target) { 
        clearInterval(interval);
        setTimeout(() => {
          
        this.emit(MMGameEvent.PRELOAD_COMPLETE);
        }, 1000);
      }
      count++;
    }, 10);
    } catch(e) {
      console.error(e)
    }

    // setTimeout(() => {
    //   this.emit(MMGameEvent.PRELOAD_COMPLETE);
    // }, 3000);
  }
}