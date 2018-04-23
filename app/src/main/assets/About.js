//thanks :TouchSnow

var About = function () {
    this.blockNode = this.blockNode || {};
};

About.prototype.onDidLoadFromCCB = function () {
    if (sys.platform == 'browser') {
        this.onEnter();
    }
    else {
        this.rootNode.onEnter = function () {
            this.controller.onEnter();
        };
    }

    this.rootNode.schedule(function (dt) {
        this.controller.onUpdate(dt);
    });

    this.rootNode.onTouchesBegan = function (touches, event) {
        this.controller.onTouchesBegan(touches, event);
        return true;
    };
    this.rootNode.setTouchEnabled(true);
};


About.prototype.onEnter = function () {
    //color bg
    var bgColor = cc.Sprite.create("res/whiteBlock.png");
    bgColor.setPosition(cc.p(0, 0));
    bgColor.setScaleX(720 / 300);
    bgColor.setScaleY(1280 / 500);
    bgColor.setAnchorPoint(cc.p(0, 0));
    bgColor.setColor(cc.c3b(0, 255, 0));
    this.scoreNode.addChild(bgColor);
    this.scoreNode.bgColor = bgColor;

    //about tittle
    var modeLabel = cc.LabelTTF.create("About");
    this.scoreNode.addChild(modeLabel);
    modeLabel.setPosition(cc.p(350, 1000));
    modeLabel.setColor(cc.c3b(0, 0, 0));
    modeLabel.setAnchorPoint(cc.p(0.5, 0.5));

    //result
    var resultLabel = cc.LabelTTF.create("Berhasil", "Arial", 110);
    this.scoreNode.addChild(resultLabel);
    resultLabel.setPosition(cc.p(360, 750));
    resultLabel.setAnchorPoint(cc.p(0.5, 0.5));
    resultLabel.setColor(cc.c3b(139, 58, 58));
    this.scoreNode.result = resultLabel;

    //back
    var backLabel = cc.LabelTTF.create("Kembali Ke Menu", "Arial", 50);
    this.scoreNode.addChild(backLabel);
    backLabel.setPosition(cc.p(200, 400));
    backLabel.setAnchorPoint(cc.p(0.5, 0.5));
    backLabel.setColor(cc.c3b(0, 0, 0));
    this.scoreNode.back = backLabel;
};


About.prototype.onUpdate = function (dt) {
    return
};


About.prototype.onTouchesBegan = function (touches, event) {
    this.pBegan = touches[0].getLocation();
    var backRect = cc.rectCreate(this.scoreNode.back.getPosition(), [50, 30]);
    if (cc.rectContainsPoint(backRect, this.pBegan)) {
        this.scoreNode.back.runAction(cc.Sequence.create(cc.ScaleTo.create(0.1, 1.1),
            cc.CallFunc.create(function () {
                cc.AudioEngine.getInstance().stopAllEffects();
                cc.BuilderReader.runScene("", "StartLayer");
            })
        ));
    }
};