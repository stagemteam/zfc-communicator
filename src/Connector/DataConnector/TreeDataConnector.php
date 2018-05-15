<?php

namespace Stagem\Communicator\Connector\DataConnector;

class TreeDataConnector extends DataConnector{
	protected $parent_name = 'parent';

	/*! constructor
		
		Here initilization of all Masters occurs, execution timer initialized
		@param res 
			db connection resource
		@param type
			string , which hold type of database ( MySQL or Postgre ), optional, instead of short DB name, full name of DataWrapper-based class can be provided
		@param item_type
			name of class, which will be used for item rendering, optional, DataItem will be used by default
		@param data_type
			name of class which will be used for dataprocessor calls handling, optional, DataProcessor class will be used by default. 
	 *	@param render_type
	 *		name of class which will provides data rendering
	*/
	public function __construct($res,$type=false,$item_type=false,$data_type=false,$render_type=false){
		if (!$item_type) $item_type="TreeCommonDataItem";
		if (!$data_type) $data_type="CommonDataProcessor";
		if (!$render_type) $render_type="TreeRenderStrategy";
		parent::__construct($res,$type,$item_type,$data_type,$render_type);
	}

	//parse GET scoope, all operations with incoming request must be done here
	protected function parse_request(){
		parent::parse_request();

		if (isset($_GET[$this->parent_name]))
			$this->request->set_relation($_GET[$this->parent_name]);
		else
			$this->request->set_relation("0");

		$this->request->set_limit(0,0); //netralize default reaction on dyn. loading mode
	}

	/*! renders self as  xml, starting part
	*/
	protected function xml_start(){
		return "<data parent='".$this->request->get_relation()."'>";
	}
}