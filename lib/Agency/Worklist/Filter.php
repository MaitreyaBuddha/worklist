<?php
//  Copyright (c) 2010, LoveMachine Inc.
//  All Rights Reserved.
//  http://www.lovemachineinc.com

require_once ('functions.php');
require_once ('classes/User.class.php');
require_once ('workitem.class.php');

class Agency_Worklist_Filter
{
    protected $name = '.worklist';

	// Filter for worklist
    protected $user = 0;
    protected $status = 'BIDDING';
    protected $query = '';
    protected $sort = 'priority';
    protected $dir = 'ASC';
    protected $page = 1;
    
    // Additional filter for reports
    protected $paidstatus = 'ALL';
    protected $order = 'name';
    protected $start = '';
    protected $end = '';
    // Additional filter for type for reports page
    // 30-APR-2010 <Yani>
    protected $type = 0;
    
    // Additional filter for job in PayPal reports
    // 30-APR-2010 <Andres>
    protected $job = 0;
    
    
    public function getPaidstatus()
    {
    	return $this->paidstatus;
    }
    
    public function setPaidstatus($paidStatus)
    {
    	$this->paidstatus = $paidStatus;
    	return $this;
    }
    
    public function getOrder()
    {
    	return $this->order;
    }
    
    public function setOrder($order)
    {
    	$this->order = $order;
    }
    
    public function getStart()
    {
    	return$this->start;    
	}
	
	public function setStart($start)
	{
		$this->start = $start;
		return $this;
	}
	
	public function getEnd()
	{
		return $this->end;
	}
	
	public function setEnd($end)
	{
		$this->end = $end;
		return $end;
	}
	
	// getter for $type
	// @return type of the fee
	// 30-APR-2010 <Yani>
	public function getType()
	{
	    return $this->type;
	}

    // setter for $type
    // @param $type type to set  
    // 30-APR-2010 <Yani>	
	public function setType($type)
	{
	    $this->type = $type;
	}
	
	// getter for $job
	// @return job_id number
	// 30-APR-2010 <Andres>
	public function getJob() {
	   return $this->job;
	}
	
    // setter for $job
    // @param $job job id number
    // 30-APR-2010 <Andres>
    public function setJob($job) {
        if ($id = ltrim($job, '#')) {
            return $this->job = (int) $id;
        } else {
           return $this->job = (int) $job;
        }
    }

    /**
     * @return the $user
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @return the $status
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @return the $query
     */
    public function getQuery()
    {
        return $this->query;
    }

    /**
     * @return the $sort
     */
    public function getSort()
    {
        return $this->sort;
    }

    /**
     * @return the $dir
     */
    public function getDir()
    {
        return $this->dir;
    }
    
    /**
     * @return the $page
     */
    public function getPage()
    {
        return $this->page;	
    }
    
    /**
     * @return the $name
     */
    public function getName()
    {
        return $this->name;	
    }

    /**
     * @param $user the $user to set
     */
    public function setUser($user)
    {
        $this->user = (int) $user;
        return $this;
    }

    /**
     * @param $status the $status to set
     */
    public function setStatus($status)
    {
        $this->status = $status;
        return $this;
    }

    /**
     * @param $query the $query to set
     */
    public function setQuery($query)
    {
        $this->query = $query;
        return $this;
    }

    /**
     * @param $page the $page to set
     */
    public function setPage($page)
    {
        $this->page = (int)$page;
        return $this;
    }

    /**
     * @param $name the $name to set
     */
    public function setName($name)
    {
        $this->name = (string)$name;
        return $this;
    }

    /**
     * @param $sort the $sort to set
     */
    public function setSort($sort)
    {
        switch (strtoupper($sort)) {
            case 'WHO':
                $sort = 'creator_nickname';
                break;
            case 'SUMMARY':
                $sort = 'summary';
                break;
            case 'WHEN':
                $sort = 'delta';
                break;
            case 'STATUS':
                $sort = 'status';
                break;
            case 'COMMENTS':
                $sort = 'comments';
                break;
            // Allowing sort by ID
            // 21-MAY-2010 <Yani>
            case 'ID':
                $sort = 'id';
                break;
            case 'PRIORITY':
            default:
                $sort = 'priority';
                break;
        }
        $this->sort = $sort;
        return $this;
    }

    /**
     * @param $dir the $dir to set
     */
    public function setDir($dir)
    {
        if ($dir == 'desc') {
            $this->dir = strtoupper(
            $dir);
        } else {
            $this->dir = 'ASC';
        }
        return $this;
    }

    /* 
     * Function getUserSelectbox Get a combobox containing all the users
     * 
     * @param active If true will return users with at least a fee on the last
     *               45 days.
     * @return html containg the checkbox for active users and the combobox
     * 
     * Notes: A reference to utils.js should be included for the auto refreshing
     *        behavior to work properly.
     *        <script type="text/javascript" src="js/utils.js"></script>
     *        
     *        Also a global variable named filterName should be set to the
     *        filter name assigned on the php code. This variable needs to
     *        be initialized before including the script above.
     */
    public function getUserSelectbox($active=1) {
        $users = User::getUserlist(getSessionUserId(), $active);
        $box = '<select name="user">';
        $box .= '<option value="0"' . (($this->getUser() == 0) ? ' selected="selected"' : '') . '>All Users</option>';
        foreach ($users as $user) {
            $box .= '<option value="' . $user->getId() . '"' . (($this->getUser() == $user->getId()) ? ' selected="selected"' : '') . '>' . $user->getNickname() . '</option>';
        }
        $box .= '</select>';
        
        return $box;
    }

    public function getStatusSelectbox()
    {
        $status_array = array_merge(
        array('ALL'
        ), WorkItem::getStates());
        $box = '<select name="status">';
        foreach ($status_array as $status) {
            $selected = '';
            if ($this->getStatus() ==
             $status) {
                $selected = ' selected="selected"';
            }
            $box .= '<option value="' .
             $status . '"' . $selected .
             '>' . $status . '</option>';
        }
        $box .= '</select>';
        return $box;
    }

    public function __construct(array $options = array())
    {
        if (!empty($options) && (empty($options['reload']) || $options['reload'] == 'false')) {
            $this->setOptions($options);
        } elseif (isset($options['name'])) {
        	$this->setName($options['name'])
        		 ->initFilter();
        }
    }
    
    public function initFilter()
    {
    	if (getSessionUserId() > 0) {
    		$this->initByDatabase();
    	} else {
    		$this->initByCookie();
    	}
    }

    private function setOptions(array $options)
    {
    	if (isset($options['name'])) {
    		$this->setName($options['name']);
    	} else {
    		$options = $options[$this->getName()];
    	}
        $cleanOptions = array();
        $methods = get_class_methods($this);
        foreach ($options as $key => $value) {
            $method = 'set' . ucfirst($key);
            if (in_array($method, $methods)) {
                $this->$method($value);
                if ($key != 'name') {
                	$cleanOptions[$key] = $value;
                }
            }
        }
        $this->save($cleanOptions);
        return $this;
    }

    private function saveToDatabase($cleanOptions)
    {
        $user = new User();
        $user->findUserById(getSessionUserId());
        $filter = unserialize($user->getFilter());
        
        $filter[$this->getName()] = $cleanOptions;
        
        $user->setFilter(serialize($filter));
        $user->save();
    }

    private function saveToCookie($cleanOptions)
    {
    	if (isset($_COOKIE['FilterCookie'])) {
    		$filter = unserialize($_COOKIE['FilterCookie']);
    	} else {
    		$filter = array();
    	}
    	$filter[$this->getName()] = $cleanOptions;
        $setcookie = setcookie('FilterCookie', serialize($filter), time() + 3600, '/', SERVER_NAME, false, false);
        if ($setcookie === false) {
            throw new Exception('Cookie could not be set!');
        }
    }

    private function save($cleanOptions)
    {
        if (getSessionUserId() > 0) {
            $this->saveToDatabase($cleanOptions);
        } else {
            $this->saveToCookie($cleanOptions);
        }
    }

    private function initByDatabase()
    {
        $user = new User();
        $user->findUserById(getSessionUserId());
        if ($user->getFilter()) {
            $this->setOptions(unserialize($user->getFilter()));
        }
    }

    private function initByCookie()
    {
        if (isset($_COOKIE['FilterCookie'])) {
            $this->setOptions(unserialize($_COOKIE['FilterCookie']));
        }
    }
}
