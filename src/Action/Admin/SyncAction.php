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

class SyncAction extends AbstractAction
{

    protected $config;


    public function __construct($config)
    {
        $this->config = $config;
    }

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $config = $this->config;
        $db = $config['db'];
        $table = $config['communicator']['table'];
        $columns = $config['communicator']['columns'];
        $res = mysqli_connect($db['hostname'], $db['username'], $db['password'], $db['database']);
        mysqli_set_charset($res, "utf8");
        $scheduler = new SchedulerConnector($res);
        $scheduler->render_table($table, implode($columns, ','));

        
        /*$view = new ViewModel([]);
        return $handler->handle($request->withAttribute(ViewModel::class, $view));*/
    }
}