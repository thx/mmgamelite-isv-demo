const data = {
    version: 2,
    stage: null,
    background: 0xffffff,
    width: 750,
    height: 1334,
    framerate: 24,
    totalFrames: 1,
    assets: {
        "r_start_bg": "r_start_bg.jpg",
        "scene_game": "scene_game.shapes.txt"
    },
    lib: {},
    shapes: {},
    textures: {},
    spritesheets: [],
    getTexture: function (id) {
        if (data.textures[id]) {
            return data.textures[id];
        }
        const atlas = data.spritesheets.find(atlas => !!atlas.textures[id]);
        return atlas ? atlas.textures[id] : null;
    },
    setup: function (animate) {
        const MovieClip = animate.MovieClip;
        const Container = animate.Container;
        const Sprite = animate.Sprite;
        const Text = animate.Text;
        const Graphics = animate.Graphics;


        data.lib.mc_circle = class extends Container {
            constructor() {
                super();
                const instance3 = new Graphics()
                    .drawCommands(data.shapes.scene_game[2]);
                const instance2 = new Graphics()
                    .drawCommands(data.shapes.scene_game[1]);
                const instance1 = new Graphics()
                    .drawCommands(data.shapes.scene_game[0]);
                this.addChild(instance3, instance2, instance1);
            }
        };

        data.lib.mc4 = class extends MovieClip {
            constructor() {
                super({
                    duration: 72
                });
                const instance1 = new data.lib.mc_circle();
                this.addTimedChild(instance1, 0, 72, {
                    "0": {
                        x: 163.4,
                        y: 42.9,
                        sx: 0.733,
                        sy: 0.733,
                        tw: {
                            d: 28,
                            p: {
                                y: 78.9
                            }
                        }
                    },
                    "28": {
                        tw: {
                            d: 43,
                            p: {
                                y: 42.9
                            }
                        }
                    }
                });
            }
        };

        data.lib.mc3 = class extends MovieClip {
            constructor() {
                super({
                    duration: 72
                });
                const instance1 = new data.lib.mc_circle();
                this.addTimedChild(instance1, 0, 72, {
                    "0": {
                        x: -160.65,
                        y: 283,
                        sx: 0.867,
                        sy: 0.867,
                        tw: {
                            d: 48,
                            p: {
                                y: 251
                            }
                        }
                    },
                    "48": {
                        tw: {
                            d: 23,
                            p: {
                                y: 283
                            }
                        }
                    }
                });
            }
        };

        data.lib.mc2 = class extends MovieClip {
            constructor() {
                super({
                    duration: 72
                });
                const instance1 = new data.lib.mc_circle();
                this.addTimedChild(instance1, 0, 72, {
                    "0": {
                        x: 207.45,
                        y: -278.95,
                        sx: 0.367,
                        sy: 0.367,
                        tw: {
                            d: 35,
                            p: {
                                y: -302.95
                            }
                        }
                    },
                    "35": {
                        tw: {
                            d: 36,
                            p: {
                                y: -278.95
                            }
                        }
                    }
                });
            }
        };

        data.lib.mc1 = class extends MovieClip {
            constructor() {
                super({
                    duration: 72
                });
                const instance1 = new data.lib.mc_circle();
                this.addTimedChild(instance1, 0, 72, {
                    "0": {
                        x: -203.5,
                        y: -130.9,
                        sx: 0.7,
                        sy: 0.7,
                        tw: {
                            d: 29,
                            p: {
                                y: -174.9
                            }
                        }
                    },
                    "29": {
                        tw: {
                            d: 42,
                            p: {
                                y: -130.9
                            }
                        }
                    }
                });
            }
        };

        data.lib.mc_container = class extends Container {
            constructor() {
                super();
                const instance4 = new data.lib.mc1()
                    .setTransform(39.5, -36);
                const instance3 = new data.lib.mc2()
                    .setTransform(24);
                const instance2 = new data.lib.mc3()
                    .setTransform(-23.35, 8);
                const instance1 = new data.lib.mc4()
                    .setTransform(24, 26.3);
                this.addChild(instance4, instance3, instance2, instance1);
            }
        };

        data.lib.mc_scene_game = class extends Container {
            constructor() {
                super();
                const instance3 = new Sprite(data.getTexture("r_start_bg"))
                    .setTransform(-375, -812);
                const instance2 = new data.lib.mc_container()
                    .setTransform(4.55, -119.9);
                this[instance2.name = "bubble_container"] = instance2;
                const instance1 = new Text("操作提示：点击蓝色泡泡 消除完毕完成互动")
                    .setStyle({
                        fontFamily: "Verdana",
                        fontSize: 33,
                        leading: 2
                    })
                    .setAlign("center")
                    .setTransform(0.05000000000001137, 443.95);
                this.addChild(instance3, instance2, instance1);
            }
        };

        data.lib.scene_game = class extends MovieClip {
            constructor() {
                super({
                    duration: 1,
                    framerate: 24
                });
                const instance1 = new data.lib.mc_scene_game()
                    .setTransform(375, 666.95);
                this[instance1.name = "scene_game"] = instance1;
                this.addChild(instance1);
            }
        };
        data.stage = data.lib.scene_game;
    }
};


export default data;
