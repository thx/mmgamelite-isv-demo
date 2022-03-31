import { MMGameScene, MMGameSceneEvent, PGlobal } from "@taojimu/mmgamelite-miniapp-v6";
// 引入Adobe Animate导出的布局\动画文件
import layoutLib from "/resources/scene_start";

/**
 * 开始场景定义
 */
export class SceneStart extends MMGameScene {
  constructor(options) {

    super(options);

    // 定位规则按钮对象显示在窗口右上角位置
    this.setLayoutStyle({
      btn_rule: {
        top: 170,
        right: 105
      }
    });

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

    console.log('sceneStart onInited', this.interactiveObjInAnimate);

    // this.interactiveObjInAnimate 存储有动画文件内设置了name的对象映射

    const { 
      btn_start, 
      btn_rule
    } = this.interactiveObjInAnimate;
    this.btnStart = btn_start;

    this.btnRule = btn_rule;

    this.bindEvent();
  }
  bindEvent() {
    const btn_start = this.btnStart;
    btn_start.interactive = true;
    btn_start.on('tap', this.startGame, this);

    const btn_rule = this.btnRule;
    btn_rule.interactive = true;
    btn_rule.on('tap', this.showRule, this);
  }
  startGame() {
    PGlobal.Application.stage.emit(MMGameSceneEvent.SCENE_CHANGE, { sceneName: 'sceneGame' });
  }
  showRule() {
    PGlobal.Application.stage.emit('SHOW_POP');
  }
}