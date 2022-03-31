import { MMGameScene, MMGameSceneEvent, PGlobal } from "@taojimu/mmgamelite-miniapp-v6";

// 引入Adobe Animate导出的布局\动画文件
import layoutLib from "/resources/scene_game";
/**
 * 开始场景定义
 */
export class SceneGame extends MMGameScene {
  constructor(options) {

    super(options);

    // 初始化 Adobe Animate导出文件的布局
    this.initAnimateBackground(layoutLib);

    // 监听场景初始化完成
    this.on(MMGameSceneEvent.SCENE_INITED, this.onInited, this);

    // 场景被添加到舞台上时触发
    this.on('added', () => {
      this.resetBubble();
    });

    // 场景从舞台移除时触发
    this.on('removed', () => { });
  }
  /**
   * 场景初始化完成
   * @param {*} e 
   */
  onInited(e) {
    
    // this.interactiveObjInAnimate 存储有动画文件内设置了name的对象映射
    const { bubble_container } = this.interactiveObjInAnimate;
    this.bubbleContainer = bubble_container;
    
    this.bindEvent();
  }
  bindEvent() {
    this.bubbleContainer.children.forEach(mc => {
      mc.interactive = true;
      mc.on('tap', (e) => {
        e.currentTarget.visible = false;
        if (this.checkStatusIsEnd()) {
          my.showToast({
            content: '互动结束~'
          });
          setTimeout(() => {
            this.endGame();
          }, 2000);
        }
      });
    });
  }
  endGame() {
    PGlobal.Application.stage.emit(MMGameSceneEvent.SCENE_CHANGE, { sceneName: 'sceneEnd' });
  }
  checkStatusIsEnd() {
    let isEnd = true;
    this.bubbleContainer.children.forEach(mc => {
      if (mc.visible === true) {
        isEnd = false;
      }
    });
    return isEnd;
  }
  resetBubble() {
    if (this.bubbleContainer) {
      this.bubbleContainer.children.forEach(mc => mc.visible = true);
    }
  }
}