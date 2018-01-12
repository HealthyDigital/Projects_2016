<?php
error_reporting('E_ALL');
ini_set('display_errors', 1);

class Delivery {
    private $user_date;
    private $month;
    private $year;
    private $days_in_month;
    private $date_info;
    private $current_date;
    private $day_of_week;
	private $today;
    private static $start_date_stamp;
	private $user_state;
    private $number_of_months = 18;
    private $holiday_data = '';
    private $days_of_week = array('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun');
    private $state_holidays = array('01-01-2018','25-12-2018', '26-12-2018', '01-01-2019', '25-12-2019', '26-12-2019', '01-01-2020', '25-12-2020', '26-12-2020');
    public $delivery_dates = array();
    private $followup_dates = array();
    private $state_holiday = array();
    private $delivery_period = '0 week';
    
    public function __construct($date, $state) {
        $this::$start_date_stamp = strtotime(str_replace(',', '', $date));
		$this->user_state = $state;
		$this->today = date('d-m-Y');
        $this->holiday_data = json_decode(file_get_contents('./includes/holidays.json'));
		///get state holidays
		foreach ($this->holiday_data as $key => $value) {
			if($key === $this->user_state) {
				foreach ($value as $d) {
					$this->state_holidays[] = $d->date;
				}
			}
		}
		////print_r($this->state_holidays); echo '<br><br>';
		///check if starting date is less than today
		if(strtotime($this->today) > $this::$start_date_stamp) {
			$this::$start_date_stamp = strtotime($this->verify_date_for_holiday(date('d-m-Y', strtotime($this->today.' +1 weekday'))));
		}
		///
		////$this->user_date =date('jS F Y', $this::$start_date_stamp);
        $this->current_date = date('d-m-Y', $this::$start_date_stamp);
        ///
        for ($x = 1; $x <= $this->number_of_months; $x++) {
            
            if(count($this->delivery_dates) < 12 ) {
                            
                $this->current_date = date('d-m-Y', strtotime('+' . $this->delivery_period, strtotime($this->current_date)));
				///print $this->current_date.' :S<br>';
                /////
                $this->current_date = $this->current_date;
				
				$this->current_date = $this->verify_date_for_holiday($this->current_date);
                
                ////
                $key = date('_m_Y', strtotime($this->current_date));
           /// print $key. ' ::y<br>';
                if(array_key_exists($key, $this->delivery_dates)) {
                   // print $key. ' ::k<br>';
                    array_push($this->delivery_dates[$key], $this->current_date);
                }
                else {
                    $this->delivery_dates[$key] = array($this->current_date);
               }
                
                $this->followup_dates[] = $this->add_follow_up_date(strtotime($this->current_date .'-1 week'));
                
                $this->delivery_period = '4 weeks';

            } //count
                
        } ///for
		
    //// print_r($this->state_holidays); echo '<br><br>';
		///print_r($this->delivery_dates); echo '<br>';
        
    }
  	private function check_for_weekends($date) {
		$current_date_info = getdate(mktime(0,0,0, date('n', $date), date('j', $date), date('Y', $date)));
		switch($current_date_info['wday']) {
			case 0:
				$days_to_subtract = '2 days';
				break;
			case 1:
				$days_to_subtract = '3 days';
				break;
			case 6:
				$days_to_subtract = '1 day';
				break;
			default:
				$days_to_subtract = '0 day';
				break;
		}
		////print $days_to_subtract . ' :sub<br>';
	  return $days_to_subtract;
	}
	///check for holiday dates
	private function verify_date_for_holiday($date) {
		
		foreach ($this->state_holidays as $d) {
			if(strtotime($d) === strtotime($date)) {
				$current_date_stamp = strtotime('-1 day', strtotime($date));
				///check if date falls on weekend
				$date = date('d-m-Y', strtotime('-' . $this->check_for_weekends($current_date_stamp), $current_date_stamp ));
				echo $d . ' Ho... '. $date.' <br>';
				///check again if new date falls on holiday
				if (in_array($date, $this->state_holidays)) {
					$date = date('d-m-Y', strtotime($date . ' -1 day'));
		  			$date = date('d-m-Y', strtotime($date .' -' . $this->check_for_weekends(strtotime($date))) );
					////print $date . ' :iN2<br>';
					///$current_date_stamp = strtotime('-1 day', strtotime($date));
				}

			} /// if
		} ///foreach
		
	  	return $date;
	}
	
	private function add_follow_up_date($date) {
		$date = $this->verify_date_for_holiday(date('d-m-Y', strtotime('-'.$this->check_for_weekends($date), $date)));
		////print $date . ' :FU<br>';
		return strtotime($date);
	}
    
    ////create calendar
    public function create_calendar() {
        ///add table details to container
		$start = 0;
		$output = "<table class='calendar'><tr>";
        foreach ($this->delivery_dates as $k => $value) {
            $delivery_date = strtotime('01-'.str_replace('_', '-', ltrim($k, '_')));
            $this->month = date('n', $delivery_date);
            $this->year = date('Y', $delivery_date);
            $this->days_in_month = cal_days_in_month(CAL_GREGORIAN, $this->month, $this->year);
            $this->date_info = getdate(mktime(0,0,0, $this->month, 1, $this->year));
            $this->day_of_week = $this->date_info['wday'];
			////assign new start date
			if($start === 0) {
				$this::$start_date_stamp = strtotime($value[0]);
			}
			////change first day to monday
			switch($this->day_of_week) {
				case 1:
					$this->day_of_week = 0;
					break;
				case 2:
					$this->day_of_week = 1;
					break;
				case 3:
					$this->day_of_week = 2;
					break;
				case 4:
					$this->day_of_week = 3;
					break;
				case 5:
					$this->day_of_week = 4;
					break;
				case 6:
					$this->day_of_week = 5;
					break;
				default:
					$this->day_of_week = 6;
					break;
			}
            ///print date('d m Y', $delivery_date) . '<br>';
            $output .= "<td><table class='month'>";
            $output .= "<caption>" . $this->date_info['month'] . ' <span>' . $this->year . '</span></caption>';
            $output .= "<tr>";

            ///add header days
            foreach ($this->days_of_week as $day ) {
                ///print $day;
                $output .= "<th>" . $day . "</th>";
            }

            $output .= "</tr><tr>";

            if ($this->day_of_week > 0) {
                $output .= "<td colspan='" . $this->day_of_week . "'></td>";
            }

            $day_count = 1;

            while ($day_count <= $this->days_in_month) {
                if ($this->day_of_week === 7) {
                    $this->day_of_week = 0;
                    $output .= "</tr><tr>";
                }

                $output .= "<td class='" . $this->highlight_date($day_count, $this->day_of_week, $value) . "'><span>" . $day_count . "</span></td>";

                $day_count++;
                $this->day_of_week++;
            }
            ///
            if ($this->day_of_week !== 7) {
                $day_diff = 7 - $this->day_of_week;
                $output .= "<td colspan='" . $this->day_of_week . "'></td>";
            }
            ///
            $output .= "</tr>";
            $output .= "</table></td>";
			
			$start % 3 === 2 && $start < 11 ? $output .= "</tr><tr>" : '';
			///print ($start % 4).'<br>';
			///
			$start++;
        }
		$output .= "</tr></table>";
		print $output;
    } ///createCalendar

    ///
    private function highlight_date($day, $weekday, $dates) {
        ///
        $current_date = strtotime($day .'-'. $this->month .'-'. $this->year);
        $class = $this::$start_date_stamp === $current_date ? 'start ' : '';
        $weekday === 5 || $weekday === 6 ? $class .= 'wkend ' : '';
		/// delivery
		foreach ($dates as $d) {
			$date = strtotime($d);
			$date === $current_date && $this::$start_date_stamp !== $date ? $class .= 'delivery ' : '';
		}
        ///holiday
        foreach ($this->state_holidays as $d) {
			$holiday = strtotime($d);
			$current_date === strtotime($d) ? $class .= 'holiday ' : '';
        }
        ///follow up
        foreach ($this->followup_dates as $day) {
            $current_date === $day && $day > $this::$start_date_stamp? $class .= 'follow-up ' : '';
        }
        
        $class .= date('d-m-Y', $current_date);
        
       /// print $class.'<br>';
        return $class;
    }
}