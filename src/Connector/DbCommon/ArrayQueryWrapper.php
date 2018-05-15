<?php

namespace Stagem\Communicator\Connector\DbCommon;

class ArrayQueryWrapper{
	public function __construct($data){
		$this->data = $data;
		$this->index = 0;
	}
}