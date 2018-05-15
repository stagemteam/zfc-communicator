<?php
namespace Stagem\Communicator\Connector\SchedulerConnector;

class JSONSchedulerDataItem extends SchedulerDataItem{
    /*! return self as XML string
    */
    function to_xml(){
        if ($this->skip) return "";

        $obj = array();
        $obj['id'] = $this->get_id();
        $obj['start_date'] = $this->data[$this->config->text[0]["name"]];
        $obj['end_date'] = $this->data[$this->config->text[1]["name"]];
        $obj['text'] = $this->data[$this->config->text[2]["name"]];
        for ($i=3; $i<sizeof($this->config->text); $i++){
            $extra = $this->config->text[$i]["name"];
            $obj[$extra]=$this->data[$extra];
        }

        if ($this->userdata !== false)
            foreach ($this->userdata as $key => $value)
                $obj[$key]=$value;

        return $obj;
    }
}