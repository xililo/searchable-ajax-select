<?php

namespace xililo\SearchableAjaxSelect;

use yii\web\AssetBundle;

class SearchableSelectInputAsset extends AssetBundle
{
    public $sourcePath = '@vendor/xililo/searchable-ajax-select/src/assets';
    public $js = [
        'searchable-ajax-select.js',
    ];
    public $css = [
        'searchable-ajax-select.css',
    ];
    public $depends = [
        'yii\web\JqueryAsset',
    ];
}