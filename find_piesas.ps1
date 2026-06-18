$lines = Get-Content 'C:\Users\foxky\.gemini\antigravity\scratch\dnd-pwa\spells_db.js' -Encoding UTF8
$lineNum = 0
foreach ($line in $lines) {
    $lineNum++
    $idx = $line.IndexOf('pies' + [char]0xE1 + 's')
    if ($idx -ge 0) {
        $start = [Math]::Max(0, $idx - 50)
        $len = [Math]::Min(120, $line.Length - $start)
        Write-Output "Line ${lineNum}: ...$($line.Substring($start, $len))..."
    }
}
