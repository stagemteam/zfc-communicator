<?php
/**
 * The MIT License (MIT)
 * Copyright (c) 2018 Stagem Team
 * This source file is subject to The MIT License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/MIT
 *
 * @category Stagem
 * @package Stagem_Communicator
 * @author Vlad Kozak <vk@stagem.com.ua>
 * @license https://opensource.org/licenses/MIT The MIT License (MIT)
 */

namespace Stagem\Communicator;



return [

    'assetic_configuration' => require_once 'assets.config.php',

    'actions' => [
        'communicator' => __NAMESPACE__ . '\Action'
    ],
    'doctrine' => [
        'driver' => [
            __NAMESPACE__ . '_driver' => [
                'class' => 'Doctrine\ORM\Mapping\Driver\AnnotationDriver',
                'cache' => 'array',
                'paths' => [__DIR__ . '/../src/' . __NAMESPACE__ . '/Model'],
            ],
            'orm_default' => [
                'drivers' => [
                    __NAMESPACE__ . '\Model' => __NAMESPACE__ . '_driver',
                ],
            ],
        ],
    ],
    'view_manager' => [
        'template_path_stack' => [
            __NAMESPACE__ => __DIR__ . '/../view',
        ],
        'prefix_template_path_stack' => [
            'communicator::' => __DIR__ . '/../view/communicator',
        ],
    ],
];