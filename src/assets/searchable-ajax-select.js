(function ($) {
    $.fn.searchableSelect = function (options) {
        var settings = $.extend({
            ajaxURL: '',
            placeholder: 'Search...',
            minimumInputLength: 2
        }, options);

        return this.each(function () {
            var $select = $(this);
            //get initial value and id
            var selectId = $select.attr('id');
            var initialVal = $select.attr('value');

            var widgetId = 'searchable-s-' + selectId;
            // Create the search input field
            var $searchInput = $('<input type="text" class="form-control searchable-select-search-input" placeholder="' + settings.placeholder + '">');

            // Create the dropdown container
            var $dropdown = $('<div class="searchable-select-dropdown ' + widgetId + '"></div>');
            var $selected = $('<div class="searchable-select-selected ' + widgetId + '"></div>');

            // Append the search input and dropdown to the parent element
            $select.wrap('<div class="searchable-select"></div>');
            $select.before($selected);
            $select.after($dropdown);
            $select.after($searchInput);

            console.log(initialVal);

            if (initialVal) {
                $.ajax({
                    url: settings.ajaxURL,
                    method: 'GET',
                    data: { id: initialVal },
                    dataType: 'json',
                    success: function (data) {
                        var option = data.results;
                        $select.val(option.id);
                        var spanVal = '<span class="selected-searchable-item">' + option.text + '</span>';
                        spanVal += '<span class="selected-searchable-item-remove">x</span>';
                        var $spanVal = $(spanVal);
                        $('.searchable-select-selected.' + widgetId).html($spanVal);
                        $($searchInput).addClass('input-selected');
                        $dropdown.empty();
                        $spanVal.on('click', function () {
                            $('.searchable-select-selected.' + widgetId).html('');
                            $($searchInput).removeClass('input-selected');
                            $select.val('');
                        })

                    },
                    error: function (xhr, status, error) {
                        console.error(error);
                    }
                });
            }
            // Hide the original select element
            $select.hide();

            // Handle input change event
            $searchInput.on('input', function () {
                var searchTerm = $(this).val();

                if (searchTerm.length >= settings.minimumInputLength) {
                    // Make an AJAX call to load search options
                    $.ajax({
                        url: settings.ajaxURL,
                        method: 'GET',
                        data: { q: searchTerm },
                        dataType: 'json',
                        success: function (data) {
                            renderOptions(data);
                        },
                        error: function (xhr, status, error) {
                            console.error(error);
                        }
                    });
                } else {
                    // Clear options when search term is too short
                    clearOptions();
                }
            });

            // Render the search options
            function renderOptions(response) {

                $dropdown.empty();
                var options = response.results;
                if (options.length > 0) {
                    options.forEach(function (option) {
                        var $option = $('<div class="searchable-select-dropdown-option">' + option.text + '</div>');

                        $option.on('click', function () {
                            $select.val(option.id);
                            $searchInput.val(option.text);
                            $dropdown.empty();
                            var spanVal = '<span class="selected-searchable-item">' + option.text + '</span>';
                            spanVal += '<span class="selected-searchable-item-remove">x</span>';
                            var $spanVal = $(spanVal);
                            $('.searchable-select-selected.' + widgetId).html($spanVal);
                            $($searchInput).addClass('input-selected');
                            $dropdown.empty();
                            $spanVal.on('click', function () {
                                $('.searchable-select-selected.' + widgetId).html('');
                                $($searchInput).removeClass('input-selected');
                                $select.val('');

                            })
                            $searchInput.val('');
                        });

                        $dropdown.append($option);
                    });
                } else {
                    var $noResults = $('<div class="searchable-select-dropdown-no-results">No results found</div>');
                    $dropdown.append($noResults);
                }
            }

            // Clear the search options
            function clearOptions() {
                $dropdown.empty();
            }
        });
    };
})(jQuery);
