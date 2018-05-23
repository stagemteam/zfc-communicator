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

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Interop\Http\Server\RequestHandlerInterface;
use Stagem\ZfcAction\Page\AbstractAction;
use Stagem\Communicator\Connector\SchedulerConnector\SchedulerConnector;
use Zend\View\Model\ViewModel;

class SyncAction extends AbstractAction
{

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        return $handler->handle($request->withAttribute(ViewModel::class, $this->action($request)));
    }

    public function action(ServerRequestInterface $request)
    {
        ob_start();
        //$db = 'dentistry';
        $table = 'communicator';
        $columns = [
            'start_date',
            'end_date',
            'description',
        ];
        $res = mysqli_connect('127.0.0.1', 'root', '', 'dentistry');
        mysqli_set_charset($res, "utf8");
        $scheduler = new SchedulerConnector($res);
        $scheduler->render_table($table, implode($columns, ','));
    }
}