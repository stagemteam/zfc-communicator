<?php

namespace Stagem\Communicator\Connector\Strategy;

use Stagem\Communicator\Connector\DbCommon\DataRequestConfig;

class JSONGroupRenderStrategy extends GroupRenderStrategy {

	public function render_set($res, $name, $dload, $sep, $config, $mix, $usemix = false){
		$output=array();
		$index=0;
		$conn = $this->conn;
		if ($usemix) $this->mix($config, $mix);
		while ($data=$conn->sql->get_next($res)){
			if (isset($data[$config->id['name']])) {
				$data = $this->complex_mix($mix, $data);
				$has_kids = false;
			} else {
				$data[$config->id['name']] = $data['value'].$this->id_postfix;
				$data[$config->text[0]['name']] = $data['value'];
				$has_kids = true;
			}
			$data = new $name($data,$config,$index);
			$conn->event->trigger("beforeRender",$data);
			if ($has_kids === false) {
				$data->set_kids(false);
			}

			if ($data->has_kids()===-1 && $dload)
				$data->set_kids(true);
			$record = $data->to_xml_start();
			if (($data->has_kids()===-1 || ( $data->has_kids()==true && !$dload))&&($has_kids == true)){
				$sub_request = new DataRequestConfig($conn->get_request());
				$sub_request->set_relation(str_replace($this->id_postfix, "", $data->get_id()));
				$temp = $this->render_set($conn->sql->select($sub_request), $name, $dload, $sep, $config, $mix, true);
				if (sizeof($temp))
					$record["data"] = $temp;
			}
			$output[] = $record;
			$index++;
		}
		if ($usemix) $this->unmix($config, $mix);
		return $output;
	}

}