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

class ConfigProvider
{
    public function __invoke()
    {
        $config = include __DIR__ . '/../config/module.config.php';
        unset($config['router']);

        return $config;
    }
}