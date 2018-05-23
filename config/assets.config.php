<?php
namespace Stagem\Communicator;

return [
    //'assetic_configuration' => [
    // Use on development environment
    //'debug' => false,
    //'buildOnRequest' => false,

    // This is optional fla// This is optional flag, by default set to `true`.
    // In debug mode allow you to combine all assets to one file.
    // 'combine' => false,
    // this is specific to this project
    'webPath' => realpath('public') . '/assets',
    'basePath' => 'assets',

    'default' => [
        'options' => [
            'mixin' => true,
        ],
    ],

    'controllers' => [
        'communicator' => [
            '@communicator_css',
            '@communicator_libs_css',
            '@communicator_libs_js',
            '@communicator_js',
        ],
    ],

    'modules' => [
        __NAMESPACE__ => [
            'root_path' => __DIR__ . '/../view/assets',
            'collections' => [
                'communicator_libs_css' => [
                    'assets' => [
                        'css/dhtmlx/dhtmlxscheduler_material.css',
                        'css/dhtmlxCombo/skins/dhtmlxcombo_dhx_terrace.css',
                    ],
                ],
                'communicator_css' => [
                    'assets' => [
                        'css/stagem.scheduler.css'
                    ],
                ],
                'communicator_libs_js' => [
                    'assets' => [
                        'js/dhtmlx/raven.min.js',
                        'js/dhtmlx/dhtmlxscheduler.js',
                        'js/dhtmlx/dhtmlxscheduler_units.js',
                        'js/dhtmlx/dhtmlxscheduler_minical.js',
                        'js/dhtmlx/dhtmlxscheduler_pdf.js',
                        'js/dhtmlx/locale/locale_ru.js',
                        'js/dhtmlx/dhtmlxscheduler_active_links.js',
                        'js/dhtmlx/dhtmlxscheduler_limit.js',
                        //'js/dhtmlx/dhtmlxscheduler_quick_info.js',
                        'js/dhtmlx/dhtmlxscheduler_url.js',
                        'js/dhtmlx/dhtmlxscheduler_html_templates.js',
                        'js/dhtmlx/dhtmlxscheduler_collision.js',
                        'js/dhtmlx/dhtmlxscheduler_limit.js',
                        'js/dhtmlx/dhtmlxscheduler_editors.js',
                        'js/dhtmlxCommon/dhtmlxcommon.js',
                        'js/dhtmlxCombo/dhtmlxcombo.js',
                    ],
                ],
                'communicator_js' => [
                    'assets' => [
                        'js/stagem.scheduler.js',
                    ],
                ],
                'communicator_images' => [
                    'assets' => [
                        'images/*.gif',
                        'images/*.png',
                    ],
                ],
            ],
        ],
    ],
];