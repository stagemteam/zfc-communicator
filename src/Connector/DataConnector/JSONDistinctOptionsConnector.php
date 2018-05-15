<?php

namespace Stagem\Communicator\Connector\DataConnector;

class JSONDistinctOptionsConnector extends JSONOptionsConnector{
	/*! render self
		process commands, return data as XML, not output data to stdout, ignore parameters in incoming request
		@return
			data as XML string
	*/
	public function render(){
		if (!$this->init_flag){
			$this->init_flag=true;
			return "";
		}
		$res = $this->sql->get_variants($this->config->text[0]["db_name"],$this->request);
		return $this->render_set($res);
	}
}