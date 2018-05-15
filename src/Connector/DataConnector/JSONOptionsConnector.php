<?php

namespace Stagem\Communicator\Connector\DataConnector;

/*! wrapper around options collection, used for comboboxes and filters
**/
class JSONOptionsConnector extends JSONDataConnector{
	protected $init_flag=false;//!< used to prevent rendering while initialization
	public function __construct($res,$type=false,$item_type=false,$data_type=false){
		if (!$item_type) $item_type="JSONCommonDataItem";
		if (!$data_type) $data_type=""; //has not sense, options not editable
		parent::__construct($res,$type,$item_type,$data_type);
	}
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
		$res = $this->sql->select($this->request);
		return $this->render_set($res);
	}
}