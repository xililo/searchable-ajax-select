<?php

namespace xililo\SearchableAjaxSelect;

use yii\widgets\InputWidget;
use yii\helpers\Html;
use yii\web\View;
use xililo\SearchableAjaxSelect\SearchableAjaxSelectAsset;

class SearchableAjaxSelect extends InputWidget
{

    public $ajaxURL;
    public $placeholder = 'Search...';
    public $minimumInputLength = 2;

    public function init()
    {
        $view = $this->getView();
        $id = $this->getId();
        $searchInputId = $id . '-search-input';
        $dropdownId = $id . '-dropdown';

        $js = <<<JS
                $(document).ready(function() {
                    $('#$searchInputId').searchableSelect({
                        ajaxURL: '$this->ajaxURL',
                        placeholder: '$this->placeholder',
                        minimumInputLength: $this->minimumInputLength
                    });
                });
            JS;
        $view->registerJs($js, View::POS_READY);
        SearchableAjaxSelectAsset::register($view);
        $this->options['class'] = 'search-input';
        $this->options['id'] = $searchInputId;

        echo Html::activeTextInput($this->model, $this->attribute, $this->options);
        echo Html::tag('div', '', ['id' => $dropdownId, 'class' => 'dropdown']);
    }
}