if has("python")
    function! LoadRope()
python << EOF
import ropevim
EOF
    endfunction

    call LoadRope()

    let ropevim_codeassist_maxfixes=10
    let ropevim_vim_completion=1
    let ropevim_guess_project=1
    let ropevim_enable_autoimport=1
    let ropevim_enable_shortcuts=1
    let ropevim_extended_complete=1
endif
