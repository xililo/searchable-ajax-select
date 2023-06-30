# Searchable Ajax Select

Searchable Ajax Select is a Yii2 widget that provides a searchable select input with the capability to make AJAX calls to load search options dynamically.

## Installation

You can install the package via Composer by running the following command:



## Usage

To use the Searchable Ajax Select widget in your Yii2 application, follow these steps:

   ```php
   composer require xililo/searchable-ajax-select

   ```
1. In your form view, use the widget::

   ```php
    use xililo\SearchableAjaxSelect\SearchableAjaxSelect;
    use yii\helpers\Url;

    <?= $form->field($model, 'attribute')->widget(SearchableAjaxSelect::class, [
        'ajaxURL' => Url::to(['controller/user-list']), // Replace with your actual AJAX URL
        'placeholder' => 'Search for options...',
        'minimumInputLength' => 3,
    ]) ?>

    ```
    Customize the ajaxURL, placeholder, and minimumInputLength options as needed.
2. In your controller: 

   ```php
    public function actionUserList($q = null, $id = null) {
        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $out = ['results' => ['id' => '', 'text' => '']];
        if (!is_null($q)) {
            $query = new Query;
            $query->select('id, name AS text')
                ->from('city')
                ->where(['like', 'name', $q])
                ->limit(20);
            $command = $query->createCommand();
            $data = $command->queryAll();
            $out['results'] = array_values($data);
        }
        elseif ($id > 0) {
            $item = City::findOne($id);
            $name = ($item !=null) $item->name : 'null';
            $out['results'] = ['id' => $id, 'text' => $name];
        }
        return $out;
    }
    ```

## Requirements

- PHP >= 5.4
- Yii2 Framework

## License

This package is open source software licensed under the [MIT License](LICENSE).
