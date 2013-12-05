jquery-photo-enlarger
=====================

A simple widget to enlarge and shrink photos. See a demo on the [project page](http://epicserve.github.io/jquery-photo-enlarger/).

Requirements
------------

- jquery ~2.0.3",
- imagesloaded ~3.0.4 and it's dependances

Usage
-----

In the `<head>` load your CSS.

    <link rel="stylesheet" href="js/jquery-photo-enlarger/css/jquery-photo-enlarger.css">

In the `<body>` add some content and thumbnails.

        <div id="main-content">

            <div class="page-header">
                <h1>jQuery Photo Enlarger <small>Example</small></h1>
            </div>

            <div class="related-content">
                <div class="thumb">
                    <img class="photo" src="photo-1-small.jpg" data-large_photo="photo-1-large.jpg" data-caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
                </div>
                <div class="thumb">
                    <img class="photo" src="photo-2-small.jpg" data-large_photo="photo-2-large.jpg" data-caption="Phasellus vel blandit tellus. Pellentesque sit amet nunc suscipit ...">
                </div>
            </div>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius vulputate mauris, sit amet egestas orci ullamcorper id. Aenean vehicula sem ligula, at auctor erat tempus ut. Nullam vestibulum, purus tincidunt bibendum tristique, quam est fermentum augue, vitae lobortis quam sapien sed enim. Nam a iaculis nulla. Cras mollis diam dui, sit amet ullamcorper nibh blandit et. Etiam consequat tempus varius. Praesent faucibus diam quis dolor fringilla faucibus. Integer quis aliquet augue.</p>

            <p>Phasellus vel blandit tellus. Pellentesque sit amet nunc suscipit, egestas augue a, tempor arcu. Praesent porta, ipsum a interdum aliquam, elit odio pharetra justo, eget ullamcorper risus felis non diam. Mauris molestie dui turpis, sit amet tincidunt arcu cursus gravida. Sed sed ultricies justo, non interdum orci. Morbi ut diam metus. Pellentesque eu nisl dapibus libero aliquam ornare eget sed mauris. Praesent luctus, leo ac auctor sodales, dui lectus interdum dui, a pretium justo velit at erat. Aenean tempus tincidunt tellus vel cursus. Aliquam in eleifend quam. Mauris lacinia semper risus, ac mattis eros interdum ut. Fusce et metus accumsan enim lobortis tincidunt eu ac libero.</p>

            <p>Pellentesque nec leo neque. Integer at diam ipsum. Vestibulum sodales, enim et consectetur lacinia, nibh nisl ultricies orci, sit amet volutpat nisl nibh volutpat quam. Praesent nisi leo, scelerisque quis neque nec, scelerisque dapibus lectus. Integer justo elit, placerat vitae libero vel, lacinia viverra turpis. Sed rutrum at libero quis sagittis. Ut eu neque elementum, viverra dui eu, dignissim metus. Maecenas at rutrum nibh. Maecenas ac nisl eu risus rutrum sollicitudin. Suspendisse ullamcorper, nulla eu semper porttitor, turpis neque mollis nisi, in euismod dui neque a magna. Duis tempor lorem in sollicitudin posuere. Sed interdum iaculis nulla vel rutrum. In eget neque in purus elementum gravida ultricies sed erat.</p>

        </div>
    </div>

At the end of the `<body>` add the required javascript.

    <script src="jquery.js"></script>
    <script src="EventEmitter.min.js"></script>
    <script src="eventie.js"></script>
    <script src="imagesloaded.js"></script>
    <script src="jquery-photo-enlarger.js"></script>

Then initialize jquery-photo-enlarger.

    <script>
    (function($) {
        
        // with no options ...
        $('.thumb').PhotoEnlarger();

        // or with options
        $('.thumb').PhotoEnlarger({'caption_fadein_speed': 300, 'caption_fadeout_speed': 300,});


    }(jQuery));
    </script>


Options
-------

<table>
    <tr>
        <th>Option</th>
        <th>Default</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>max_width_container</td><td>The 2nd ancestor to the thumb div</td><td>The container the determines the maximum width of the large photo.</td>
    </tr>
    <tr>
        <td>caption_fadein_speed</td><td>500</td><td>The time it takes for the caption to fades in.</td></tr>
    <tr>
        <td>caption_fadeout_speed</td><td>500</td><td>The time it takes for the caption to fades out.</td>
    </tr>
    <tr>
        <td>enlarge_speed</td><td>300</td><td>The time it takes for photo to enlarge.</td></tr>
    <tr>
        <td>shrink_speed</td><td>300</td><td>The time it takes for photo to shrink.</td>
    </tr>
    <tr>
        <td>add_caption_function</td><td>null</td><td>Use a custom function for adding the caption. Called with the arguements $caption, caption_text, $thumb_lg_div and plugin.</td>
    </tr>
</table>
