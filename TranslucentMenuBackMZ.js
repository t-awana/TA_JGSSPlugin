//=============================================================================
// TranslucentMenuBackMZ.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc 透けるメニュー背景を実装します。
 * @author 沫那環（Tamaki Awana）
 * @help
 * メニュー画面に、一枚絵を利用した、透け感のある背景を
 * 重ねて描写する機能を実装します。
 * 加えて、一枚絵の下に表示される背景のぼかしの有無や、
 * メニュー画面やゲーム終了画面で背景を暗くするかどうかの設定もできるようにしました。
 * 
 * 【使い方】
 * img/pictureフォルダに、背景として使用したい画像を入れた上で、
 * プラグインパラメータのBackground Imageから選択してください。
 * 画像はゲームの画面サイズと同じ大きさにしてください。
 * ぼかしの有無と、背景を暗くする機能の切り替えは、背景画像を導入しなくても設定可能です。
 *
 * 【プラグインコマンドについて】
 * このプラグインには、プラグインコマンドはありません。
 *
 * 【更新履歴】
 * ver.1.0 公開
 *
 * ---
 * このプラグインは MIT License にもとづいて提供されます。
 * https://opensource.org/licenses/mit-license.php
 *
 *
 * @param Background Image
 * @desc メニュー画面の背景に使用する画像
 * @type file
 * @require 1
 * @dir img/pictures
 * @default MenuBack
 *
 * @param Background Opacity
 * @desc 背景画像の透明度
 * @type number
 * @min 0
 * @default 224
 *
 * @param Background Blur
 * @desc 背景の下層部分にぼかしをかけるか
 * @on ぼかす
 * @off ぼかさない
 * @default true
 * @type boolean
 *
 * @param Dark Background On Menu
 * @desc メニュー画面の背景をさらに暗くするか
 * @on 暗くする
 * @off 暗くしない
 * @default true
 * @type boolean
 * 
 * @param Dark Background on GameEnd
 * @desc ゲーム終了画面の背景を暗くするか
 * @on 暗くする
 * @off 暗くしない
 * @default true
 * @type boolean
 */
(function () {
  const parameters = PluginManager.parameters("TranslucentMenuBackMZ");
  const BgImg = String(parameters["Background Image"] || "");
  const BgOpacity = Number(parameters["Background Opacity"] || 224);
  const BgBlur = String(parameters["Background Blur"] || "true");
  const MenuBgDark = String(parameters["Dark Background On Menu"] || "true");
  const GEBgDark = String(parameters["Dark Background on GameEnd"] || "true");

  Scene_MenuBase.prototype.createBackground = function () {
    this._backgroundFilter = new PIXI.filters.BlurFilter();
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
    if (String(BgBlur) == "true") {
      this._backgroundSprite.filters = [this._backgroundFilter];
    }
    this.addChild(this._backgroundSprite);
    if (String(MenuBgDark) == "true") {
      this.setBackgroundOpacity(192);
    }
    if (BgImg) {
      this._backgroundSprite2 = new Sprite(ImageManager.loadPicture(BgImg));
      this._backgroundSprite2.opacity = BgOpacity;
      this.addChild(this._backgroundSprite2);
    }
  };

  Scene_MenuBase.prototype.start = function () {
    Scene_Base.prototype.start.call(this);
    if (BgImg) {
      this.scaleSprite(this._backgroundSprite2);
    }
  };

  Scene_GameEnd.prototype.createBackground = function () {
    Scene_MenuBase.prototype.createBackground.call(this);
    if (String(GEBgDark) == "true") {
      this.setBackgroundOpacity(128);
    }
  };
})();
