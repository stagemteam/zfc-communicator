<?php

namespace Stagem\Communicator\Connector\DataConnector;
use Stagem\Communicator\Connector\BaseConnector\DataItem;

class JSONCommonDataItem extends DataItem{
	/*! return self as XML string
	*/
	function to_xml(){
		if ($this->skip) return "";

		$data = array(
			'id' => $this->get_id()
		);
		for ($i=0; $i<sizeof($this->config->text); $i++){
			$extra = $this->config->text[$i]["name"];
			$data[$extra]=$this->data[$extra];
		}

		if ($this->userdata !== false)
			foreach ($this->userdata as $key => $value)
				$data[$key]=$value;

		return $data;
	}
}
