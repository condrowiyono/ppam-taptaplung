//thanks :TouchSnow

var StartLayer = function () {
    cc.log("StartLayer")
    this.startNode = this.startNode || {};
};

StartLayer.prototype.onDidLoadFromCCB = function () {
    if (sys.platform == 'browser') {
        this.onEnter();
    }
    else {
        this.rootNode.onEnter = function () {
            this.controller.onEnter();
        };
    }

    this.rootNode.onTouchesBegan = function (touches, event) {
        this.controller.onTouchesBegan(touches, event);
        return true;
    };

    this.rootNode.setTouchEnabled(true);
};


StartLayer.prototype.onEnter = function () {
    var winSize = cc.Director.getInstance().getWinSize();
    this.blockWidth = winSize.width / 2;
    this.blockHeight = winSize.height / 2;
    this.scaleX = this.blockWidth / 300;
    this.scaleY = this.blockHeight / 500;

    this.tables = new Array(2);
    for (var j = 0; j < 2; j++) {
        var sprites = new Array(2);
        for (var i = 0; i < 2; i++) {
            sprites[i] = this.newBlock(i, j);
        }
        this.tables[j] = sprites;
    }
};

StartLayer.prototype.newBlock = function (i, j) {
    var block = cc.Sprite.create("res/whiteBlock.png");
    block.setPosition(cc.p(this.blockWidth / 2 + this.blockWidth * i, this.blockHeight / 2 + this.blockHeight * j));
    block.setScaleX(this.scaleX);
    block.setScaleY(this.scaleY);
    block.setZOrder(100);
    block.setAnchorPoint(cc.p(0.5, 0.5));

    var words = ["Bantuan", "", "Mainkan", "Tentang"];
    var wordNum = 0;
    if (j == 0 && i == 1) {
        wordNum = 1
    } else if (j == 1 && i == 0) {
        wordNum = 2
    } else if (j == 1 && i == 1) {
        wordNum = 3
    }

    var blockLabel = cc.LabelTTF.create(words[wordNum], "Arial", 50);
    block.addChild(blockLabel);
    blockLabel.setPosition(cc.p(this.blockWidth / 2 - 30, this.blockHeight / 2 - 60));
    blockLabel.setAnchorPoint(cc.p(0.5, 0.5));
    var colors = [cc.c3b(0, 0, 0), cc.c3b(255, 255, 255)];
    if (i == j) {
        block.setColor(colors[0]);
        blockLabel.setColor(colors[1]);
    } else {
        block.setColor(colors[1]);
        blockLabel.setColor(colors[0]);
    }
    block.label = blockLabel;

    this.startNode.addChild(block);
    return block;
};


StartLayer.prototype.onTouchesBegan = function (touches, event) {
    // cc.BuilderReader.runScene("", "MainLayer");
    this.pBegan = touches[0].getLocation();
    for (var j = 0; j < 2; j++) {
        for (var i = 0; i < 2; i++) {
            var block = this.tables[j][i];
            if (block) {
                var blockRect = cc.rectCreate(block.getPosition(), [this.blockWidth / 2, this.blockHeight / 2]);
                if (cc.rectContainsPoint(blockRect, this.pBegan)) {
                    cc.AudioEngine.getInstance().playEffect(PIANO_SIMPLE[1 + getRandom(6)], false);
                    if (j == 0 && i == 0) {
                        var key = block.label.getString();
                        if (key == "Bantuan") {
                            block.label.setString("Tekan Calung");
                        } else if (key == "Tekan Calung") {
                            block.label.setString("Bukan");
                        } else if (key == "Bukan") {
                            block.label.setString("Yang Putih");
                        } else if (key == "Yang Putih") {
                          block.label.setString("Tentang");
                        } else if (key == "Tentang") {
                            block.label.setString("Calung");
                        } else if (key == "Calung") {
                            block.label.setString("adalah");
                        } else if (key == "adalah") {
                            block.label.setString("alat musik");
                        } else if (key == "alat musik") {
                              block.label.setString("tradisional");
                          }
                          else if (key == "tradisional") {
                          block.label.setString("sunda");
                        } else if (key == "sunda") {
                          block.label.setString("yang terbuat");
                        } else if (key == "yang terbuat") {
                          block.label.setString("dari bambu");
                        } else if (key == "dari bambu") {
                          block.label.setString("dimainkan");
                        } else if (key == "dimainkan") {
                          block.label.setString("dengan cara");
                        } else if (key == "dengan cara") {
                          block.label.setString("dipukul");
                        } else if (key == "dipukul") {
                            block.label.setString("Siap Main?");
                          }else if (key == "Siap Main?") {
                            block.label.setString("Bantuan");
                          }
                        //GAME_MODE = MODE_ABOUT; //
                        //cc.BuilderReader.runScene("", "StartLayer");
                    } else if (j == 0 && i == 1) {

                    } else if (j == 1 && i == 0) { //play
                        GAME_MODE = MODE_CLASSIC;
                        cc.BuilderReader.runScene("", "MainLayer");
                    } else if (j == 1 && i == 1) {  //tentang
                        var key = block.label.getString();
                        if (key == "Tentang") {
                            block.label.setString("PPAM");
                        } else if (key == "PPAM") {
                            block.label.setString("Tap-tap-Lung");
                        } else if (key == "Tap-tap-Lung") {
                            block.label.setString("Cakue");
                        } else if (key == "Cakue") {
                          block.label.setString("Jundi");
                        } else if (key == "Jundi") {
                            block.label.setString("Condro");
                        } else if (key == "Condro") {
                            block.label.setString("Afna");
                        } else if (key == "Afna") {
                            block.label.setString("PPAM");
                        }
                    }
                }
            }
        }
    }
};


