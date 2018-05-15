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

namespace Stagem\Communicator\Action\Admin;

use Fig\Http\Message\RequestMethodInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Interop\Http\Server\RequestHandlerInterface;
use Zend\View\Model\ViewModel;
use Stagem\ZfcAction\Page\AbstractAction;

class IndexAction extends AbstractAction
{
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $view = new ViewModel([]);
        return $handler->handle($request->withAttribute(ViewModel::class, $view));
    }
}