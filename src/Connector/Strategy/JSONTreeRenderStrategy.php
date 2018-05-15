<?php

namespace Stagem\Communicator\Connector\Strategy;

use Stagem\Communicator\Connector\DbCommon\DataRequestConfig;

class JSONTreeRenderStrategy extends TreeRenderStrategy {

	public function render_set($res, $name, $dload, $sep, $config,$mix){
		$output=array();
		$index=0;
		$conn = $this->conn;
		$this->mix($config, $mix);
		while ($data=$conn->sql->get_next($res)){
			$data = $this->complex_mix($mix, $data);
			$data = new $name($data,$config,$index);
			$conn->event->trigger("beforeRender",$data);
			//there is no info about child elements, 
			//if we are using dyn. loading - assume that it has,
			//in normal mode just exec sub-render routine			
			if ($data->has_kids()===-1 && $dload)
				$data->set_kids(true);
			$record = $data->to_xml_start();
			if ($data->has_kids()===-1 || ( $data->has_kids()==true && !$dload)){
				$sub_request = new DataRequestConfig($conn->get_request());
				$sub_request->set_relation($data->get_id());
				$temp = $this->render_set($conn->sql->select($sub_request), $name, $dload, $sep, $config, $mix);
				if (sizeof($temp))
					$record["data"] = $temp;
			}
			$output[] = $record;
			$index++;
		}
		$this->unmix($config, $mix);
		return $output;
	}

}